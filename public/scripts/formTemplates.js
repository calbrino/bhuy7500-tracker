// formTemplates.js
export function destinationInputHtml() {
    return `
        <h2>Destination Details</h2>
        <div id="destinationContainer">
            <div class="form-group destination-entry">
                <label for="destination-1">Destination:</label>
                <select class="form-control" id="destination-1" required>
                    <option value="">Select Destination</option>
                </select>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="tripStartDate-1">Start Date:</label>
                        <input type="date" class="form-control" id="tripStartDate-1" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="tripEndDate-1">End Date:</label>
                        <input type="date" class="form-control" id="tripEndDate-1" required>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-outline-primary" id="addDestination">Add Another Destination</button>
    `;
}

export function peopleInputHtml() {
    return `
        <h2>People Details</h2>
        <div class="form-group">
            <label for="numPeople">How many people are going?</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button" id="decreasePeople">-</button>
                </div>
                <input type="number" class="form-control" id="numPeople" value="1" min="1" required>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="increasePeople">+</button>
                </div>
            </div>
        </div>
    `;
}

export function travelWithInputHtml() {
    return `
        <div class="form-group">
            <label for="travellingWith">Who are you travelling with?</label>
            <select class="form-control" id="travellingWith" required>
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

export function accommodationInputHtml() {
    return `
        <h2>Accommodation Details</h2>
        <div id="accommodationContainer">
            <div class="form-group accommodation-entry">
                <label for="accommodationType-1">Accommodation Type:</label>
                <select class="form-control" id="accommodationType-1" required>
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
                        <input type="date" class="form-control" id="accommodationStartDate-1" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="accommodationEndDate-1">End Date:</label>
                        <input type="date" class="form-control" id="accommodationEndDate-1" required>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-outline-primary" id="addAccommodation">Add Another Accommodation</button>
    `;
}

export function mealBudgetingHtml() {
    return `
        <h2>Meal Budgeting</h2>
        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="breakfast">Breakfast ($):</label>
                <input type="number" class="form-control" id="breakfast" value="0" required>
            </div>
            <div class="form-group col-md-4">
                <label for="lunch">Lunch ($):</label>
                <input type="number" class="form-control" id="lunch" value="0" required>
            </div>
            <div class="form-group col-md-4">
                <label for="dinner">Dinner ($):</label>
                <input type="number" class="form-control" id="dinner" value="0" required>
            </div>
        </div>
        <p><strong>Daily Total:</strong> $<span id="dailyTotal">0</span></p>
        <p><strong>Trip Total:</strong> $<span id="tripTotal">0</span></p>
    `;
}

export function activitiesHtml() {
    return `
        <h2>Activities</h2>
        <div id="activitiesContainer">
            <div class="form-group activity-entry">
                <label for="activityName-1">Activity:</label>
                <input type="text" class="form-control" id="activityName-1" placeholder="Enter activity name" required>
                <label for="activityDate-1">Date:</label>
                <input type="date" class="form-control" id="activityDate-1" required>
            </div>
        </div>
        <button type="button" class="btn btn-outline-primary" id="addActivity">Add Activity</button>
    `;
}

export function additionalCostsHtml() {
    return `
        <h2>Additional Costs</h2>
        <div id="additionalCostsContainer">
            <div class="form-group cost-entry">
                <label for="costName-1">Cost Description:</label>
                <input type="text" class="form-control" id="costName-1" placeholder="Enter cost description" required>
                <label for="costAmount-1">Amount ($):</label>
                <input type="number" class="form-control" id="costAmount-1" required>
            </div>
        </div>
        <button type="button" class="btn btn-outline-primary" id="addCost">Add Cost</button>
    `;
}
