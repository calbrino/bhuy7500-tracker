import AbstractView from "./AbstractView.js";

export default class SavedTripsView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - Saved Trips");
    }

    // Renders the HTML content of the view
    async getHtml() {
        const trips = JSON.parse(localStorage.getItem("tripData")) || [];

        let tripDetailsHtml = `
            <div class="saved-trips-container">
                <h1>My Saved Trips</h1>
                <p>Here are the details of your saved trips.</p>
        `;

        if (trips.length > 0) {
            trips.forEach((trip, index) => {
                tripDetailsHtml += `
                <div class="card">
                    <div class="card-header">
                        <span>Trip ${index + 1} ${trip.destination}</span>
                        <button class="btn btn-danger btn-sm" data-index="${index}" id="deleteTrip-${index}">Delete</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">General Information</h5>
                        <p class="card-text"><strong>Number of People:</strong> ${trip.numPeople}</p>
                        <p class="card-text"><strong>Traveling With:</strong> ${trip.travellingWith === "custom" ? trip.customTravellingWith : trip.travellingWith}</p>

                        <h5 class="card-title mt-4">Destination Details</h5>
                        <p class="card-text"><strong>Destination:</strong> ${trip.destination}</p>
                        <p class="card-text"><strong>Start Date:</strong> ${trip.tripStartDate}</p>
                        <p class="card-text"><strong>End Date:</strong> ${trip.tripEndDate}</p>

                        <h5 class="card-title mt-4">Accommodation Details</h5>
                        <p class="card-text"><strong>Type:</strong> ${trip.accommodation.type}</p>
                        <p class="card-text"><strong>Start Date:</strong> ${trip.accommodation.startDate}</p>
                        <p class="card-text"><strong>End Date:</strong> ${trip.accommodation.endDate}</p>

                        <h5 class="card-title mt-4">Meal Budgeting</h5>
                        <p class="card-text"><strong>Breakfast:</strong> $${trip.breakfast || 'N/A'}</p>
                        <p class="card-text"><strong>Lunch:</strong> $${trip.lunch || 'N/A'}</p>
                        <p class="card-text"><strong>Dinner:</strong> $${trip.dinner || 'N/A'}</p>

                        <h5 class="card-title mt-4">Activities</h5>
                        <ul class="list-group">
                                ${trip.activities && trip.activities.length > 0 ?
                                trip.activities.map(act => `<li class="list-group-item">${act.name} (Date: ${act.value})</li>`).join("")
                                : '<li class="list-group-item">No activities added.</li>'
                        }
                        </ul>

                        <h5 class="card-title mt-4">Additional Costs</h5>
                        <ul class="list-group">
                                ${trip.additionalCosts && trip.additionalCosts.length > 0 ?
                                trip.additionalCosts.map(cost => `<li class="list-group-item">${cost.name} ($${cost.value})</li>`).join("")
                                : '<li class="list-group-item">No additional costs added.</li>'
                        }
                        </ul>
                    </div>
                </div>
                `;
            });
        } else {
            tripDetailsHtml += "<p>No saved trips yet.</p>";
        }

        tripDetailsHtml += '</div>';

        return `
          <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="public/index.css">
          </head>
          <body>
            ${tripDetailsHtml} 
          </body>
        `;
    }

    // Initializes view-specific elements and event listeners
    async init() {
        this.attachDeleteTripListeners();
    }

    // Attaches listeners to delete buttons
    attachDeleteTripListeners() {
        const deleteButtons = document.querySelectorAll("[id^='deleteTrip-']");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const tripIndex = event.target.getAttribute("data-index");
                this.deleteTrip(tripIndex);
            });
        });
    }

    // Deletes a trip from local storage and reloads the view
    deleteTrip(index) {
        let trips = JSON.parse(localStorage.getItem("tripData")) || [];
        trips.splice(index, 1);
        localStorage.setItem("tripData", JSON.stringify(trips));
        this.render(); // Re-render the view to reflect changes
    }
}
