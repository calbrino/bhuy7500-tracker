import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - New Trip");
    }

    async getHtml() {
        return `
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <link rel="stylesheet" href="public/index.css">
            </head>

            <body>

        <div class="container mt-4" id="step-container">
          <h1>Plan Your Trip</h1>
          <form id="tripForm">
            <div class="form-group">
              <label for="numPeople">How many people are going?</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button" id="decreasePeople">-</button>
                </div>
                <input type="number" class="form-control" id="numPeople" value="1" min="1">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" id="increasePeople">+</button>
                </div>
              </div>
            </div>

            <div class="form-group">
            <label for="travellingWith">Who are you travelling with?</label>
            <select class="form-control" id="travellingWith">
                <option>Solo</option>
                <option>Couple</option>
                <option>Friends</option>
                <option>Family</option>
                <option value="custom">Custom</option> 
            </select>
            <input type="text" class="form-control mt-2 d-none" 
            id="customTravellingWith" placeholder="Enter custom group">
            </div>
                        
        <div class="form-group">
            <label for="destination">Where do you want to go?</label>
            <select class="form-control" id="destination">
            <option value="">Select Destination</option>
            </select>
        </div>


        <div class="form-group">
        <label for="tripStartDate">Start Date:</label>
        <input type="date" class="form-control" id="tripStartDate">
    </div>
    <div class="form-group">
        <label for="tripEndDate">End Date:</label>
        <input type="date" class="form-control" id="tripEndDate">
    </div>

    

                        
                        <div class="form-group">
                            <label for="additionalDestination">Add another Destination?</label>
                            <input type="text" class="form-control" id="additionalDestination" placeholder="Enter another destination">
                        </div>
                        <div class="form-group">
                            <label for="accommodationType">What type of accommodation (Cheap to Expensive)</label>
                            <input type="text" class="form-control" id="accommodationType" placeholder="Enter accommodation type">
                        </div>
                        <div class="form-group">
                            <label for="accommodationDates">Add your accommodation</label>
                            <input type="text" class="form-control" id="accommodationDates" placeholder="Enter accommodation dates">
                        </div>
                        <div class="form-group">
                            <label for="foodBudget">Meal Budgeting</label>
                            <input type="text" class="form-control" id="foodBudget" placeholder="Enter food budget">
                        </div>
                        <div class="form-group">
                            <label for="breakfast">Breakfast $</label>
                            <input type="number" class="form-control" id="breakfast">
                        </div>
                        <div class="form-group">
                            <label for="lunch">Lunch $</label>
                            <input type="number" class="form-control" id="lunch">
                        </div>
                        <div class="form-group">
                            <label for="dinner">Dinner $</label>
                            <input type="number" class="form-control" id="dinner">
                        </div>
                    </form>
                </div>
                
                <div class="d-flex justify-content-end mt-3">
                    <a href="#" class="btn btn-primary" id="submitTrip" data-link>Submit</a>
                </div>

                <div id="savedTrips"></div>
                
                <script src="path/to/newTrip.js" type="module"></script>
            </body>
        `;
    }

//-----------------------------------------------------------------------------------------------

    // method to handle saving data and redirecting
    async init() {

        // People counter event listeners
        const numPeopleInput = document.getElementById("numPeople");
        const decreasePeopleBtn = document.getElementById("decreasePeople");
        const increasePeopleBtn = document.getElementById("increasePeople");

        decreasePeopleBtn.addEventListener("click", () => {
            if (parseInt(numPeopleInput.value, 10) > 1) {
                numPeopleInput.value = parseInt(numPeopleInput.value, 10) - 1;
            }
        });

        increasePeopleBtn.addEventListener("click", () => {
            numPeopleInput.value = parseInt(numPeopleInput.value, 10) + 1;
        });

        // Custom traveling with input
        const travellingWithSelect = document.getElementById("travellingWith");
        const customTravellingWithInput = document.getElementById("customTravellingWith");

        travellingWithSelect.addEventListener("change", () => {
            if (travellingWithSelect.value === "custom") {
                customTravellingWithInput.classList.remove("d-none");
            } else {
                customTravellingWithInput.classList.add("d-none");
            }
        });

        // Fetch and populate countries
        const destinationSelect = document.getElementById("destination");
        const apiUrl = "https://restcountries.com/v3.1/all"; // API endpoint for all countries

        try {
            const response = await fetch(apiUrl);
            const countries = await response.json();

            // Sort countries alphabetically
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Populate the dropdown
            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.text = country.name.common;
                destinationSelect.add(option);
            });
        } catch (error) {
            console.error("Error fetching countries:", error);
        }


//-----------------------------------------------------------------------------------------------

        // Submit Trip Event Listener 
        document.getElementById("submitTrip").addEventListener("click", (event) => {
            event.preventDefault();

            const formData = {
                numPeople: document.getElementById("numPeople").value,
                travellingWith: document.getElementById("travellingWith").value === "custom"
                    ? document.getElementById("customTravellingWith").value // Get custom value
                    : document.getElementById("travellingWith").value,  // Get selected value
                destination: document.getElementById("destination").value,

                tripStartDate: document.getElementById("tripStartDate").value,
                tripEndDate: document.getElementById("tripEndDate").value,

                additionalDestination: document.getElementById("additionalDestination").value,
                accommodationType: document.getElementById("accommodationType").value,
                accommodationDates: document.getElementById("accommodationDates").value,
                foodBudget: document.getElementById("foodBudget").value,
                breakfast: document.getElementById("breakfast").value,
                lunch: document.getElementById("lunch").value,
                dinner: document.getElementById("dinner").value,

            };

//---------------------------------------------------------------------------------------------

            // Calculate trip duration INSIDE the submit event listener
            const startDate = new Date(formData.tripStartDate);
            const endDate = new Date(formData.tripEndDate);
            
            // Error handling for invalid dates
            if (isNaN(startDate) || isNaN(endDate)) {
                alert("Please enter valid start and end dates.");
                return;
            }
    
            if (startDate > endDate) {
                alert("Start date cannot be after the end date.");
                return;
            }

            // Calculate trip duration in days
            const timeDiff = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            formData.tripDuration = diffDays;

            // Save data to local storage
            localStorage.setItem("tripData", JSON.stringify(formData));

            // Redirect to saved trips
            window.location.href = "/savedtrips";
        });
    }
}