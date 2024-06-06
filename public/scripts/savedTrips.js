import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - Saved Trips");
    }

    async getHtml() {
        const tripData = JSON.parse(localStorage.getItem('tripData')); // Remove the '|| {}' part
      
        // Generate HTML content based on tripData
        let tripDetailsHtml = `
            <div class="container mt-4">
                <h1>My Saved Trips</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        `;
      
        if (tripData) { // Now check if tripData is not null
          tripDetailsHtml += `
              <div class="trip-details">
                  <p><strong>Number of People:</strong> ${tripData.numPeople}</p>
                  <p><strong>Traveling With:</strong> ${tripData.travellingWith}</p>
                  <p><strong>Destination:</strong> ${tripData.destination}</p>
                  <p><strong>Start Date:</strong> ${tripData.tripStartDate}</p>
                  <p><strong>End Date:</strong> ${tripData.tripEndDate}</p>
                  <p><strong>Trip Duration:</strong> ${tripData.tripDuration} days</p>
                  <p><strong>Additional Destination:</strong> ${tripData.additionalDestination || "None"}</p> 
                  <p><strong>Accommodation Type:</strong> ${tripData.accommodationType || "Not specified"}</p>
                  <p><strong>Accommodation Dates:</strong> ${tripData.accommodationDates || "Not specified"}</p>
                  <p><strong>Food Budget:</strong> ${tripData.foodBudget || "Not specified"}</p>
                  <p><strong>Breakfast Budget:</strong> ${tripData.breakfast || "Not specified"}</p>
                  <p><strong>Lunch Budget:</strong> ${tripData.lunch || "Not specified"}</p>
                  <p><strong>Dinner Budget:</strong> ${tripData.dinner || "Not specified"}</p>
              </div>
          `;
        } else {
          tripDetailsHtml = "<p>No saved trips yet.</p>";
        }

        
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
}
