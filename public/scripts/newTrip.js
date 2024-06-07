import AbstractView from "./AbstractView.js";

export default class NewTripView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - New Trip");
        this.currentStep = 0; // Track the current step
    }

    // Renders the HTML content of the view
    async getHtml() {
        return `
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <link rel="stylesheet" href="public/index.css">
            </head>
            <body>
                <div class="container mt-4" id="step-container">
                    <h1>Plan Your Trip</h1>
                    <br> 
                    <form id="tripForm">
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
                    <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-secondary" id="prevStep" disabled>Previous</button>
                        <button type="button" class="btn btn-primary" id="nextStep">Next</button>
                        <button type="button" class="btn btn-primary" id="submitTrip" style="display: none;">Submit</button>
                    </div>
                </div>
            </body>
        `;
    }

    // Initialize event listeners for pagination
    async init() {
        this.attachPeopleCounterListeners();
        this.attachTravelingWithListener();
        await this.populateCountriesDropdown('destination');
        this.attachStepListeners();
        this.attachSubmitTripListener();
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

        // Update button visibility and disabled state
        document.getElementById("prevStep").disabled = this.currentStep === 0;
        document.getElementById("nextStep").style.display = this.currentStep < steps.length - 1 ? "block" : "none";
        document.getElementById("submitTrip").style.display = this.currentStep === steps.length - 1 ? "block" : "none";
    }

    // HTML template for destination input section
    destinationInputHtml() {
        return `
            <h2>Destination Details</h2>
            <div class="form-group">
                <label for="destination">Destination:</label>
                <select class="form-control" id="destination">
                    <option value="">Select Destination</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="tripStartDate">Start Date:</label>
                    <input type="date" class="form-control" id="tripStartDate">
                </div>
                <div class="form-group col-md-6">
                    <label for="tripEndDate">End Date:</label>
                    <input type="date" class="form-control" id="tripEndDate">
                </div>
            </div>
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
            <div class="form-group">
                <label for="accommodationType">Accommodation Type:</label>
                <select class="form-control" id="accommodationType">
                    <option value="">Select Accommodation Type</option>
                    <option value="hotel">Hotel</option>
                    <option value="hostel">Hostel</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="resort">Resort</option>
                    <option value="guesthouse">Guesthouse</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="accommodationStartDate">Start Date:</label>
                    <input type="date" class="form-control" id="accommodationStartDate">
                </div>
                <div class="form-group col-md-6">
                    <label for="accommodationEndDate">End Date:</label>
                    <input type="date" class="form-control" id="accommodationEndDate">
                </div>
            </div>
        `;
    }

    // HTML template for meal budgeting input section
    mealBudgetingHtml() {
        return `
            <h2>Meal Budgeting</h2>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="breakfast">Breakfast ($):</label>
                    <input type="number" class="form-control" id="breakfast">
                </div>
                <div class="form-group col-md-4">
                    <label for="lunch">Lunch ($):</label>
                    <input type="number" class="form-control" id="lunch">
                </div>
                <div class="form-group col-md-4">
                    <label for="dinner">Dinner ($):</label>
                    <input type="number" class="form-control" id="dinner">
                </div>
            </div>
        `;
    }

    // HTML template for activities input section
    activitiesHtml() {
        return `
            <h2>Activities</h2>
            <div class="form-group">
                <label for="activities">List your activities, one per line (format: activity - date):</label>
                <textarea class="form-control" id="activities" rows="5"></textarea>
            </div>
        `;
    }

    // HTML template for additional costs input section
    additionalCostsHtml() {
        return `
            <h2>Additional Costs</h2>
            <div class="form-group">
                <label for="additionalCosts">List additional costs, one per line (format: cost - amount):</label>
                <textarea class="form-control" id="additionalCosts" rows="5"></textarea>
            </div>
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

    // Attaches listeners to the people counter buttons
    attachPeopleCounterListeners() {
        const numPeopleInput = document.getElementById("numPeople");
        const decreasePeopleBtn = document.getElementById("decreasePeople");
        const increasePeopleBtn = document.getElementById("increasePeople");

        decreasePeopleBtn.addEventListener("click", () => {
            if (numPeopleInput.value > 1) {
                numPeopleInput.value--;
            }
        });

        increasePeopleBtn.addEventListener("click", () => {
            numPeopleInput.value++;
        });
    }

    // Attaches a listener to the traveling with select dropdown
    attachTravelingWithListener() {
        const travellingWithSelect = document.getElementById("travellingWith");
        const customTravellingWithInput = document.getElementById("customTravellingWith");

        travellingWithSelect.addEventListener("change", () => {
            customTravellingWithInput.classList.toggle("d-none", travellingWithSelect.value !== "custom");
            if (travellingWithSelect.value !== "custom") {
                customTravellingWithInput.value = "";
            }
        });
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
        const destination = document.getElementById("destination").value.trim();
        const tripStartDate = document.getElementById("tripStartDate").value;
        const tripEndDate = document.getElementById("tripEndDate").value;

        const accommodationType = document.getElementById("accommodationType").value;
        const accommodationStartDate = document.getElementById("accommodationStartDate").value;
        const accommodationEndDate = document.getElementById("accommodationEndDate").value;

        const breakfast = document.getElementById("breakfast").value || '0';
        const lunch = document.getElementById("lunch").value || '0';
        const dinner = document.getElementById("dinner").value || '0';

        const activitiesText = document.getElementById("activities").value;
        const additionalCostsText = document.getElementById("additionalCosts").value;

        const parseLineItems = (text, delimiter = '-') => {
            return text.split('\n')
                .filter(Boolean)
                .map(line => {
                    const [name, valueStr] = line.split(delimiter);
                    if (!name || !valueStr) return null;
                    return { name: name.trim(), value: parseFloat(valueStr.trim()) || valueStr.trim() };
                })
                .filter(Boolean);
        };

        const activities = parseLineItems(activitiesText);
        const additionalCosts = parseLineItems(additionalCostsText);

        return {
            numPeople,
            travellingWith,
            customTravellingWith,
            destination,
            tripStartDate,
            tripEndDate,
            accommodation: {
                type: accommodationType,
                startDate: accommodationStartDate,
                endDate: accommodationEndDate,
            },
            breakfast,
            lunch,
            dinner,
            activities,
            additionalCosts,
        };
    }
}
