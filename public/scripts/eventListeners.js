// eventListeners.js

export function attachPeopleCounterListeners() {
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

export function attachTravelingWithListener() {
    const travellingWithSelect = document.getElementById("travellingWith");
    const customTravellingWithInput = document.getElementById("customTravellingWith");

    travellingWithSelect.addEventListener("change", () => {
        customTravellingWithInput.classList.toggle("d-none", travellingWithSelect.value !== "custom");
        if (travellingWithSelect.value !== "custom") {
            customTravellingWithInput.value = "";
        }
    });
}

export function attachActivityListeners() {
    const addActivityBtn = document.getElementById("addActivity");
    addActivityBtn.addEventListener("click", () => {
        const container = document.getElementById("activitiesContainer");
        const count = container.getElementsByClassName("activity-entry").length + 1;

        const newActivity = document.createElement("div");
        newActivity.className = "form-group activity-entry";
        newActivity.innerHTML = `
            <label for="activityName-${count}">Activity:</label>
            <input type="text" class="form-control" id="activityName-${count}" placeholder="Enter activity name">
            <label for="activityDate-${count}">Date:</label>
            <input type="date" class="form-control" id="activityDate-${count}">
        `;
        container.appendChild(newActivity);
    });
}

export function attachAdditionalCostsListeners() {
    const addCostBtn = document.getElementById("addCost");
    addCostBtn.addEventListener("click", () => {
        const container = document.getElementById("additionalCostsContainer");
        const count = container.getElementsByClassName("cost-entry").length + 1;

        const newCost = document.createElement("div");
        newCost.className = "form-group cost-entry";
        newCost.innerHTML = `
            <label for="costName-${count}">Cost Description:</label>
            <input type="text" class="form-control" id="costName-${count}" placeholder="Enter cost description">
            <label for="costAmount-${count}">Amount ($):</label>
            <input type="number" class="form-control" id="costAmount-${count}">
        `;
        container.appendChild(newCost);
    });
}

export function attachDestinationListeners(populateCountriesDropdown) {
    const addDestinationBtn = document.getElementById("addDestination");
    addDestinationBtn.addEventListener("click", async () => {
        const container = document.getElementById("destinationContainer");
        const count = container.getElementsByClassName("destination-entry").length + 1;

        const newDestination = document.createElement("div");
        newDestination.className = "form-group destination-entry";
        newDestination.innerHTML = `
            <label for="destination-${count}">Destination:</label>
            <select class="form-control" id="destination-${count}">
                <option value="">Select Destination</option>
            </select>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="tripStartDate-${count}">Start Date:</label>
                    <input type="date" class="form-control" id="tripStartDate-${count}">
                </div>
                <div class="form-group col-md-6">
                    <label for="tripEndDate-${count}">End Date:</label>
                    <input type="date" class="form-control" id="tripEndDate-${count}">
                </div>
            </div>
        `;
        container.appendChild(newDestination);

        // Populate the new dropdown with country names
        await populateCountriesDropdown(`destination-${count}`);
    });
}

export function attachAccommodationListeners() {
    const addAccommodationBtn = document.getElementById("addAccommodation");
    addAccommodationBtn.addEventListener("click", () => {
        const container = document.getElementById("accommodationContainer");
        const count = container.getElementsByClassName("accommodation-entry").length + 1;

        const newAccommodation = document.createElement("div");
        newAccommodation.className = "form-group accommodation-entry";
        newAccommodation.innerHTML = `
            <label for="accommodationType-${count}">Accommodation Type:</label>
            <select class="form-control" id="accommodationType-${count}">
                <option value="">Select Accommodation Type</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Airbnb">Airbnb</option>
                <option value="Resort">Resort</option>
                <option value="Guesthouse">Guesthouse</option>
                <option value="Other">Other</option>
            </select>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="accommodationStartDate-${count}">Start Date:</label>
                    <input type="date" class="form-control" id="accommodationStartDate-${count}">
                </div>
                <div class="form-group col-md-6">
                    <label for="accommodationEndDate-${count}">End Date:</label>
                    <input type="date" class="form-control" id="accommodationEndDate-${count}">
                </div>
            </div>
        `;
        container.appendChild(newAccommodation);
    });
}

export function attachDateListeners(updateTripDuration) {
    const startDateInputs = document.querySelectorAll("[id^='tripStartDate-']");
    const endDateInputs = document.querySelectorAll("[id^='tripEndDate-']");

    const updateAllDurations = () => {
        updateTripDuration();
    };

    startDateInputs.forEach(input => input.addEventListener("change", updateAllDurations));
    endDateInputs.forEach(input => input.addEventListener("change", updateAllDurations));
}

export function attachMealBudgetListeners(tripDurationGetter) {
    const breakfastInput = document.getElementById("breakfast");
    const lunchInput = document.getElementById("lunch");
    const dinnerInput = document.getElementById("dinner");
    const dailyTotalElement = document.getElementById("dailyTotal");
    const tripTotalElement = document.getElementById("tripTotal");

    const calculateTotals = () => {
        const breakfast = parseFloat(breakfastInput.value) || 0;
        const lunch = parseFloat(lunchInput.value) || 0;
        const dinner = parseFloat(dinnerInput.value) || 0;
        const dailyTotal = breakfast + lunch + dinner;
        const tripDuration = tripDurationGetter();
        const tripTotal = dailyTotal * tripDuration || 0;

        dailyTotalElement.textContent = dailyTotal.toFixed(2);
        tripTotalElement.textContent = tripTotal.toFixed(2);
    };

    breakfastInput.addEventListener("input", calculateTotals);
    lunchInput.addEventListener("input", calculateTotals);
    dinnerInput.addEventListener("input", calculateTotals);

    // Update totals initially
    calculateTotals();
}

export function attachDeleteTripListeners(deleteTripCallback) {
    const deleteButtons = document.querySelectorAll("[id^='deleteTrip-']");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const tripIndex = event.target.getAttribute("data-index");
            deleteTripCallback(tripIndex);
        });
    });
}

export function attachToggleDetailsListeners() {
    const toggleButtons = document.querySelectorAll(".toggle-details");
    toggleButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const tripIndex = event.target.getAttribute("data-index");
            const details = document.getElementById(`trip-details-${tripIndex}`);
            if (details.style.display === "none" || details.style.display === "") {
                details.style.display = "block";
            } else {
                details.style.display = "none";
            }
        });
    });
}
