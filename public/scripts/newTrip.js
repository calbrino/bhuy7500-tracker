import AbstractView from "./abstractView.js";
import {
    attachPeopleCounterListeners,
    attachTravelingWithListener,
    attachActivityListeners,
    attachAdditionalCostsListeners,
    attachDestinationListeners,
    attachAccommodationListeners,
    attachMealBudgetListeners,
    attachDateListeners,
} from "./eventListeners.js";

export default class NewTripView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - New Trip");
        this.currentStep = 0; // Track the current step
        this.totalSteps = 6; // Total number of steps
    }

    // Renders the HTML content of the view
    async getHtml() {
        return `
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <link rel="stylesheet" href="public/index.css">
            </head>
            <body>
            <div class="Section_top"></div> <!-- background animation -->
                <div class="container form-container mt-4">
                    <div id="step-container">
                        <h1>Plan Your Trip</h1><br>
                        <div class="progress fixed-progress">
                            <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="scrollable-content">
                            <form id="tripForm" class="form mt-2">
                                <div class="step" id="step-0" style="display: block;">
                                    ${this.destinationInputHtml()}
                                </div>
                                <div class="step" id="step-1" style="display: none;">
                                    ${this.peopleInputHtml()}
                                    ${this.travelWithInputHtml()}
                                </div>
                                <div class="step" id="step-2" style="display: none;">
                                    ${this.accommodationInputHtml()}
                                </div>
                                <div class="step" id="step-3" style="display: none;">
                                    ${this.mealBudgetingHtml()}   
                                </div>
                                <div class="step" id="step-4" style="display: none;">
                                    ${this.activitiesHtml()}
                                </div>
                                <div class="step" id="step-5" style="display: none;">
                                    ${this.additionalCostsHtml()}
                                </div>
                            </form>
                        </div>
                        <div class="d-flex justify-content-between mt-3">
                            <button type="button" class="btn btn-secondary" id="prevStep" disabled>Previous</button>
                            <button type="button" class="btn btn-primary" id="nextStep">Next</button>
                            <button type="button" class="btn btn-primary" id="submitTrip" style="display: none;">Submit</button>
                        </div>
                    </div>
                </div>
            </body>
        `;
    }

    // Initialize event listeners for pagination
    async init() {
        attachPeopleCounterListeners();
        attachTravelingWithListener();
        await this.populateCountriesDropdown('destination-1');
        this.attachStepListeners();
        this.attachSubmitTripListener();
        attachActivityListeners();
        attachAdditionalCostsListeners();
        attachDestinationListeners(this.populateCountriesDropdown);
        attachAccommodationListeners();
        attachMealBudgetListeners(() => this.getTripDuration());
        attachDateListeners(() => this.getTripDuration());
    }

    // Attach listeners to the navigation buttons
    attachStepListeners() {
        const nextStepBtn = document.getElementById("nextStep");
        const prevStepBtn = document.getElementById("prevStep");
        const submitTripBtn = document.getElementById("submitTrip");

        nextStepBtn.addEventListener("click", () => this.changeStep(1));
        prevStepBtn.addEventListener("click", () => this.changeStep(-1));
    }

    // Change the step in the form
    changeStep(direction) {
        const steps = document.querySelectorAll(".step");
        steps[this.currentStep].style.display = "none";
        this.currentStep += direction;
        steps[this.currentStep].style.display = "block";

        // Update progress bar
        this.updateProgressBar();

        // Update button visibility and disabled state
        document.getElementById("prevStep").disabled = this.currentStep === 0;
        document.getElementById("nextStep").style.display = this.currentStep < steps.length - 1 ? "block" : "none";
        document.getElementById("submitTrip").style.display = this.currentStep === steps.length - 1 ? "block" : "none";
    }

    // Update the progress bar based on the current step
    updateProgressBar() {
        const progress = (this.currentStep / (this.totalSteps - 1)) * 100;
        const progressBar = document.querySelector(".progress-bar");
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", progress);
    }

    getTripDuration() {
        const tripStartDate = document.getElementById("tripStartDate-1").value;
        const tripEndDate = document.getElementById("tripEndDate-1").value;
        const startDate = new Date(tripStartDate).getTime();
        const endDate = new Date(tripEndDate).getTime();
        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }

    // HTML template for destination input section
    destinationInputHtml() {
        return `
            <h2>Destination Details</h2>
            <div id="destinationContainer">
                <div class="form-group destination-entry">
                    <label for="destination-1">Destination:</label>
                    <select class="form-control" id="destination-1">
                        <option value="">Select Destination</option>
                    </select>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="tripStartDate-1">Start Date:</label>
                            <input type="date" class="form-control" id="tripStartDate-1">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tripEndDate-1">End Date:</label>
                            <input type="date" class="form-control" id="tripEndDate-1">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary" id="addDestination">Add Another Destination</button>
        `;
    }

    // HTML template for people input section
    peopleInputHtml() {
        return `
            <h2>People Details</h2>
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
        `;
    }

    // HTML template for traveling with input section
    travelWithInputHtml() {
        return `
            <div class="form-group">
                <label for="travellingWith">Who are you travelling with?</label>
                <select class="form-control" id="travellingWith">
                    <option>Solo</option>
                    <option>Couple</option>
                    <option>Friends</option>
                    <option>Family</option>
                    <option value="custom">Custom</option>
                </select>
                <input type="text" class="form-control mt-2 d-none" id="customTravellingWith" placeholder="Enter custom group">
            </div>
        `;
    }

    // HTML template for accommodation input section
    accommodationInputHtml() {
        return `
            <h2>Accommodation Details</h2>
            <div id="accommodationContainer">
                <div class="form-group accommodation-entry">
                    <label for="accommodationType-1">Accommodation Type:</label>
                    <select class="form-control" id="accommodationType-1">
                        <option value="">Select Accommodation Type</option>
                        <option value="hotel">Hotel</option>
                        <option value="hostel">Hostel</option>
                        <option value="airbnb">Airbnb</option>
                        <option value="resort">Resort</option>
                        <option value="guesthouse">Guesthouse</option>
                        <option value="other">Other</option>
                    </select>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="accommodationStartDate-1">Start Date:</label>
                            <input type="date" class="form-control" id="accommodationStartDate-1">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="accommodationEndDate-1">End Date:</label>
                            <input type="date" class="form-control" id="accommodationEndDate-1">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary" id="addAccommodation">Add Another Accommodation</button>
        `;
    }

    // HTML template for meal budgeting input section
    mealBudgetingHtml() {
        return `
            <h2>Meal Budgeting</h2>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="breakfast">Breakfast ($):</label>
                    <input type="number" class="form-control" id="breakfast" value="0">
                </div>
                <div class="form-group col-md-4">
                    <label for="lunch">Lunch ($):</label>
                    <input type="number" class="form-control" id="lunch" value="0">
                </div>
                <div class="form-group col-md-4">
                    <label for="dinner">Dinner ($):</label>
                    <input type="number" class="form-control" id="dinner" value="0">
                </div>
            </div>
            <p><strong>Daily Total:</strong> $<span id="dailyTotal">0</span></p>
            <p><strong>Trip Total:</strong> $<span id="tripTotal">0</span></p>
        `;
    }    

    // HTML template for activities input section
    activitiesHtml() {
        return `
            <h2>Activities</h2>
            <div id="activitiesContainer">
                <div class="form-group activity-entry">
                    <label for="activityName-1">Activity:</label>
                    <input type="text" class="form-control" id="activityName-1" placeholder="Enter activity name">
                    <label for="activityDate-1">Date:</label>
                    <input type="date" class="form-control" id="activityDate-1">
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary" id="addActivity">Add Activity</button>
        `;
    }

    // HTML template for additional costs input section
    additionalCostsHtml() {
        return `
            <h2>Additional Costs</h2>
            <div id="additionalCostsContainer">
                <div class="form-group cost-entry">
                    <label for="costName-1">Cost Description:</label>
                    <input type="text" class="form-control" id="costName-1" placeholder="Enter cost description">
                    <label for="costAmount-1">Amount ($):</label>
                    <input type="number" class="form-control" id="costAmount-1">
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary" id="addCost">Add Cost</button>
        `;
    }

    // Populates the destination dropdown with country names
    async populateCountriesDropdown(selectId) {
        const destinationSelect = document.getElementById(selectId);
        const apiUrl = "https://restcountries.com/v3.1/all";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const countries = await response.json();

            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.text = country.name.common;
                destinationSelect.add(option);
            });
        } catch (error) {
            console.error("Error fetching countries:", error);
            alert("Error fetching country data. Please try again later.");
        }
    }

    // Attaches a listener to the submit button to handle form submission
    attachSubmitTripListener() {
        document.getElementById("submitTrip").addEventListener("click", (event) => {
            event.preventDefault();
            const formData = this.getFormData();

            const startDate = new Date(formData.tripStartDate).getTime();
            const endDate = new Date(formData.tripEndDate).getTime();
            formData.tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            try {
                let trips = JSON.parse(localStorage.getItem("tripData"));
                if (!Array.isArray(trips)) {
                    trips = [];
                }
                trips.push(formData);
                localStorage.setItem("tripData", JSON.stringify(trips));
                window.location.href = "/savedtrips";
            } catch (error) {
                console.error("Error saving to local storage:", error);
                alert("Error saving data. Please try again.");
            }
        });
    }

    // Collects form data from the inputs
    getFormData() {
        const numPeople = document.getElementById("numPeople").value;
        const travellingWith = document.getElementById("travellingWith").value;
        const customTravellingWith = document.getElementById("customTravellingWith").value;
        const destinations = Array.from(document.getElementsByClassName("destination-entry")).map((entry, index) => ({
            destination: entry.querySelector(`#destination-${index + 1}`).value,
            startDate: entry.querySelector(`#tripStartDate-${index + 1}`).value,
            endDate: entry.querySelector(`#tripEndDate-${index + 1}`).value
        }));
    
        const accommodations = Array.from(document.getElementsByClassName("accommodation-entry")).map((entry, index) => ({
            type: entry.querySelector(`#accommodationType-${index + 1}`).value,
            startDate: entry.querySelector(`#accommodationStartDate-${index + 1}`).value,
            endDate: entry.querySelector(`#accommodationEndDate-${index + 1}`).value
        }));
    
        const breakfast = parseFloat(document.getElementById("breakfast").value) || 0;
        const lunch = parseFloat(document.getElementById("lunch").value) || 0;
        const dinner = parseFloat(document.getElementById("dinner").value) || 0;
    
        const activities = Array.from(document.getElementsByClassName("activity-entry")).map((entry, index) => ({
            name: entry.querySelector(`#activityName-${index + 1}`).value,
            date: entry.querySelector(`#activityDate-${index + 1}`).value
        }));
    
        const additionalCosts = Array.from(document.getElementsByClassName("cost-entry")).map((entry, index) => ({
            description: entry.querySelector(`#costName-${index + 1}`).value,
            amount: parseFloat(entry.querySelector(`#costAmount-${index + 1}`).value)
        }));
    
        // Calculate trip duration
        const tripStartDate = new Date(destinations[0]?.startDate || null);
        const tripEndDate = new Date(destinations[destinations.length - 1]?.endDate || null);
        const tripDuration = Math.ceil((tripEndDate - tripStartDate) / (1000 * 60 * 60 * 24)) || 0;
    
        const dailyMealCost = breakfast + lunch + dinner;
        const totalTripCost = dailyMealCost * tripDuration + additionalCosts.reduce((total, cost) => total + cost.amount, 0);
    
        return {
            numPeople,
            travellingWith,
            customTravellingWith,
            destinations,
            accommodations,
            breakfast,
            lunch,
            dinner,
            activities,
            additionalCosts,
            tripDuration,
            dailyMealCost,
            totalTripCost
        };
    }
}
