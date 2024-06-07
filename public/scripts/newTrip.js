//newTrip.js

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
import {
    destinationInputHtml,
    peopleInputHtml,
    travelWithInputHtml,
    accommodationInputHtml,
    mealBudgetingHtml,
    activitiesHtml,
    additionalCostsHtml
} from "./formTemplates.js";

export default class NewTripView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - New Trip");
        this.currentStep = 0; // Track the current step in the multi view form pagination
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
            
                <div class="container form-container mt-4">
                    <div id="step-container">
                        <h1>Plan Your Trip</h1><br>
                        <div class="progress fixed-progress">
                        <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="scrollable-content">
                            <form id="tripForm" class="form mt-2">
                                <div class="step" id="step-0" style="display: block;">
                                    ${destinationInputHtml()}
                                </div>
                                <div class="step" id="step-1" style="display: none;">
                                    ${peopleInputHtml()}
                                    ${travelWithInputHtml()}
                                </div>
                                <div class="step" id="step-2" style="display: none;">
                                    ${accommodationInputHtml()}
                                </div>
                                <div class="step" id="step-3" style="display: none;">
                                    ${mealBudgetingHtml()}   
                                </div>
                                <div class="step" id="step-4" style="display: none;">
                                    ${activitiesHtml()}
                                </div>
                                <div class="step" id="step-5" style="display: none;">
                                    ${additionalCostsHtml()}
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

        nextStepBtn.addEventListener("click", () => {
            if (this.validateCurrentStep()) {
                this.changeStep(1);
            }
        });
        prevStepBtn.addEventListener("click", () => this.changeStep(-1));
    }

    // Validate the current step before proceeding
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`.step#step-${this.currentStep}`);
        const inputs = currentStepElement.querySelectorAll("input, select");

        for (const input of inputs) {
            if (input.hasAttribute("required") && !input.value) {
                alert("Please fill out all required fields.");
                return false;
            }
        }
        return true;
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

    // Populates the destination dropdown with country names using restcountries api
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

    // Validate the entire form before submission
    validateForm() {
        const form = document.getElementById("tripForm");
        const inputs = form.querySelectorAll("input[required], select[required]");

        for (const input of inputs) {
            if (!input.value) {
                alert("Please fill out all required fields.");
                return false;
            }
        }
        return true;
    }

    // Attaches a listener to the submit button to handle form submission
    attachSubmitTripListener() {
        document.getElementById("submitTrip").addEventListener("click", (event) => {
            event.preventDefault();
            if (this.validateForm()) {
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
        const totalTripCost = dailyMealCost * tripDuration;

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
