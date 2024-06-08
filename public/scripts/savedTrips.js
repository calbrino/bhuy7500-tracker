// savedTrips.js

import AbstractView from "./abstractView.js";
import { attachDeleteTripListeners, attachToggleDetailsListeners } from "./eventListeners.js";

export default class SavedTripsView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - Saved Trips");
    }

    // Format date strings into Australian standard day/month/year format
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Capitalises the first letter of each word as the strings were in lowercase
    // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    capitalize(text) {
        return typeof text === 'string' ? text.replace(/\b\w/g, char => char.toUpperCase()) : '';
    }

    // Returns the HTML for my saved trips view
    async getHtml() {
        const trips = JSON.parse(localStorage.getItem("tripData")) || [];
        console.log("Fetched trips from localStorage:", trips); // Debugging log

        const tripDetailsHtml = trips.length > 0 ? trips.map((trip, index) => {
            const isLatestTrip = index === trips.length - 1;
            const destinationList = trip.destinations?.map(dest => dest.destination).join(', ') || 'Unknown Destination';
            const detailsHtml = trip.destinations && trip.destinations.length > 0 ? 
                trip.destinations.map(dest => `
                    <p class="card-text"><strong>Destination:</strong> ${dest.destination}</p>
                    <p class="card-text"><strong>Start Date:</strong> ${this.formatDate(dest.startDate)}</p>
                    <p class="card-text"><strong>End Date:</strong> ${this.formatDate(dest.endDate)}</p>
                `).join("") : '<p class="card-text">No destinations added.</p>';

            const accommodationsHtml = trip.accommodations && trip.accommodations.length > 0 ? 
                trip.accommodations.map(acc => `
                    <p class="card-text"><strong>Type:</strong> ${this.capitalize(acc.type)}</p>
                    <p class="card-text"><strong>Start Date:</strong> ${this.formatDate(acc.startDate)}</p>
                    <p class="card-text"><strong>End Date:</strong> ${this.formatDate(acc.endDate)}</p>
                `).join("") : '<p class="card-text">No accommodations added.</p>';

            const activitiesHtml = trip.activities && trip.activities.length > 0 ? 
                trip.activities.map(act => `<li class="list-group-item">${act.name} (Date: ${this.formatDate(act.date)})</li>`).join("") 
                : '<li class="list-group-item">No activities added.</li>';

            const additionalCostsHtml = trip.additionalCosts && trip.additionalCosts.length > 0 ? 
                trip.additionalCosts.map(cost => `<li class="list-group-item">${cost.description} ($${cost.amount || ''})</li>`).join("") 
                : '<li class="list-group-item">No additional costs added.</li>';

            return `
                <div class="trip-entry card mb-3">
                    <div class="card-header d-flex justify-content-between align-items-center bg-light">
                        <button class="toggle-details btn btn-link text-left" data-index="${index}">
                            Trip ${index + 1}: ${destinationList}
                        </button>
                        <button class="btn btn-danger btn-sm" data-index="${index}" id="deleteTrip-${index}">Delete</button>
                    </div>
                    <div class="card-body trip-details" id="trip-details-${index}" ${!isLatestTrip ? 'style="display: none;"' : ''}>
                        <h5 class="card-title">Destination Details</h5>
                        ${detailsHtml}
                        <hr>
                        <h5 class="card-title">General Information</h5>
                        <p class="card-text"><strong>Number of People:</strong> ${trip.numPeople || 'N/A'}</p>
                        <p class="card-text"><strong>Travel Style:</strong> ${trip.travellingWith === "custom" ? trip.customTravellingWith : trip.travellingWith || 'N/A'}</p>
                        <hr>
                        <h5 class="card-title">Accommodation Details</h5>
                        ${accommodationsHtml}
                        <hr>
                        <h5 class="card-title">Meal Budgeting</h5>
                        <p class="card-text"><strong>Breakfast:</strong> $${trip.breakfast || 'N/A'}</p>
                        <p class="card-text"><strong>Lunch:</strong> $${trip.lunch || 'N/A'}</p>
                        <p class="card-text"><strong>Dinner:</strong> $${trip.dinner || 'N/A'}</p>
                        <p class="card-text"><strong>Daily Meal Total:</strong> $${trip.dailyMealCost || 'N/A'}</p>
                        <p class="card-text"><strong>Total Meal Cost:</strong> $${trip.totalTripCost || 'N/A'}</p>
                        <hr>
                        <h5 class="card-title">Activities</h5>
                        <ul class="list-group">
                            ${activitiesHtml}
                        </ul>
                        <hr>
                        <h5 class="card-title">Additional Costs</h5>
                        <ul class="list-group">
                            ${additionalCostsHtml}
                        </ul>
                    </div>
                </div>
            `;
        }).join('') : "<p>No saved trips yet.</p>";

        return `
          <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="public/index.css">
          </head>
          <body>
            <div class="saved-trips-container">
                <h1>My Saved Trips</h1>
                <p>Here are the details of your saved trips.</p>
                <div class="saved-trips-content">
                    ${tripDetailsHtml}
                </div>
            </div>
          </body>
        `;
    }

    async init() {
        console.log("Initializing SavedTripsView"); // Debugging log
        await super.init();
        attachDeleteTripListeners(this.deleteTrip.bind(this));
        attachToggleDetailsListeners();
    }

    // Delete a trip from local storage and re-render the view
    deleteTrip(index) {
        let trips = JSON.parse(localStorage.getItem("tripData")) || [];
        trips.splice(index, 1);
        localStorage.setItem("tripData", JSON.stringify(trips));
        this.render(); // Re-render the view to reflect changes
    }
}
