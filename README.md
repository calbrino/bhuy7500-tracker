# DECO2017 – Di Trip Planner

## Table of Contents
1. [Overview](#overview)
2. [Configuration & Deployment](#configuration--deployment)
   - [Installation](#installation)
   - [Optimal Screen Size](#optimal-screen-size)
3. [Development Process](#development-process)
4. [Challenges and Solutions](#challenges-and-solutions)
5. [Notable Iterations and Changes](#notable-iterations-and-changes)
6. [References](#references)
7. [Acknowledgment and Reference of Generative AI Usage](#acknowledgment-and-reference-of-generative-ai-usage)

## Overview
Di Trip Planner is a single-page architecture web application designed to help users plan and manage their holiday trips efficiently and in a structured manner. It consists of three main sections, each functioning with a unique purpose:
1. **Home**: Plan your trips with a detailed multi-step form.
2. **New Trip**: Plan your trips with a detailed multi-step form.
3. **Saved Trips**: View and manage your saved trips.

## Configuration & Deployment

### Installation
1. **Clone the Repository**
   - Download Di as a ZIP file: The file for Di Trip Planner can be downloaded from Navigate to the main page of the repository on GitHub, click the green ‘Code’ button and then download as ZIP. Extract the ZIP file to access the files.

2. **Install Node.js Dependencies**
   - Install Node.js onto your local machine. Then, open the project folder in Visual Studio Code or another code editor and use the terminal to run:
     ```sh
     npm install
     ```
   - This command will install all required dependencies and packages.

3. **Start the Server**
   - Type the following command to start the web server:
     ```sh
     npm run dev
     ```
   - After the server starts, you should see a message in the terminal stating that the server is running at `http://localhost:1234`. Open the link in your browser (e.g. Chrome) and the web application should be ready to use.

### Optimal Screen Size
The web application is responsive, but it has been primarily designed for desktops with extensive support for mobile. The recommended and most common screen sizes are:
- **Desktop**: 1920 x 1080 (22.18%)
- **Mobile**: 360×800 (11.01%)

For more information, visit [BrowserStack](https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design).

## Development Process
The web application is made up of 3 unique pages (Homepage, New Trip, and Saved Trips), with New Trip integrating multi-view pagination for inputting all the required information. The app also includes unique features such as a dynamically changing background, a global navigation bar with responsive hamburger menu styling, modular and expandable forms for multi-inputs with a scrollable list, and an expandable accordion for the saved trips for easy viewing. The information collected and saved comprised of:
- **Destination Details**: Select destinations and specify the start and end dates.
- **People Details**: Indicate the number of people travelling on the trip.
- **Travel Style**: Select or input whom you are travelling with.
- **Accommodation**: Specify accommodation types, and start and end dates.
- **Meal Budgeting**: Plan your daily meal costs with calculations based on trip duration.
- **Activities**: Add the planned activities and their dates.
- **Additional Costs**: Include any additional expenses outside of the predefined scope.

## Challenges and Solutions
Throughout developing Di Trip Planner, I encountered endless bugs and challenges which proved to be difficult without AI aid in debugging as well as many issues with integrating existing codes from tutorials into my own. However, these challenges allowed me to quickly gain experience in advanced web design which would help me expand my knowledge of UI / UX development. Thus, here are some of the challenges I faced through the development process of Di along with the solutions:

1. **Implementing Single-Page Architecture**
   - **Issue**: At the beginning of developing Di Trip Planner, I had major difficulties in implementing the single-page architecture provided by my university tutor to my existing HTML homepage which was created prior. Additionally, I also had issues of not being able to understand the video tutorial and thus, had trouble translating their file directories to my own project’s directory.
   - **Solution**: In further consultation with my university tutor, I was advised to discard the existing HTML page for a seamless transition into async methods of routing. This also allowed me to proceed with writing inline HTML in the JavaScript files which made it easier for me to keep track of multiple HTML files and JavaScript files altogether.

2. **Implementing Pagination**
   - **Issue**: In implementing a multi-view form, I needed to paginate the form on newtrips.js so that it displays each section of the form step-by-step instead of all at once. The issue was that pagination would not properly work as I did not have a counter in JavaScript which could not track which page I was up to, also the event listener buttons were matched to my inline HTML tags instead of integrated with the step counter to display the correct view. Thus the button was stuck and did not work.
   - **Solution**: I updated the JavaScript to handle step-by-step form navigation using a currentStep variable and attached event listeners to "Next" and "Previous" buttons which would change the current step.

3. **Logo Not Displaying**
   - **Issue**: The navigation bar's logo was not showing up no matter what I was trying. Initially, I thought the issue was with the source of my image originally being ‘src/logo.png’ and thus outside the scope of my abstractView.js. I tried implementing a relative path of ‘./src/logo.png’ however the issue persisted. Preloading the logo into the webpage did not work either.
   - **Solution**: The solution was to correctly import the logo image into the abstractView.js using Parcel's asset handling. This proved to be functional, so I was able to move the logo back into the src folder for better organisation.

4. **Dynamic Background**
   - **Issue**: The original idea was to implement three.js into my code to display an interactive 3D rendering of the globe. Additionally, Google Maps’ API would be used to dynamically render the destinations selected by the user. This proved difficult in the scope of my time constraints and also introduced compatibility issues on older browsers and mobile devices.
   - **Solution**: Thus, a dynamically animated background using images was iterated on instead. This background used simple keyframing to shift the background and was more compatible with mobile devices. Furthermore, eliminating an interactive object in the background allowed me to shift all the containers in the centre of the display thus improving the user experience (previously all the containers were on the left-hand side of the screen which proved to be counterintuitive in UI design).

## Notable Iterations and Changes

### Event Listeners Separation
I moved all the event listeners into a separate file called `eventListeners.js` to improve my code’s readability and maintainability. This separation ensures that all the very repetitive event handling was modular and easier to manage to be in a dedicated file.

### Further Refactoring `newTrip.js`
Furthermore, I created a new file `formTemplates.js` to house all HTML contents related to the newTrip form. Subsequently, I imported these templates back into `newTrip.js`. Further separating what would’ve been around 650 lines of code in one file greatly improved the readability and maintainability by separating concerns for me.

### Validators
Near the end of developing `newTrip.js`, I added form validators to ensure that all the required fields were filled out before proceeding to the next step and a final check before submitting to ensure data integrity. This was introduced in the start, however, was removed as it got in the way of debugging the form collection.

### Background Enhancements
Instead of the 3D-rendered globe I originally had in my mock-ups, I implemented a background animation that would change images periodically instead, providing a dynamic visual experience. Additionally, the entire function was implemented into the AbstractView.js for global viewing.

### UI Improvements
Originally, the progress bar was integrated into the navigation bar, however, that proved to be inefficient as the progress bar was only shown during the `newTrip.js` form collection and introduced conflicts in the responsiveness of the web application. As such, the bar was moved into the container of the form collector ensuring a syllogistically and responsive display of the input progress.

### Saved Trips View
The layout of the `savedTrips` view was updated to be more user-friendly and readable. Line breaks were added between sections for better clarity. Additionally, the latest trip details were expanded by default while previous entries were collapsed.

### Minor Iterations and Changes
- Refined form compatibility to ensure consistent behaviour across different browsers and devices.
- Fixed issues with saving multiple trips in local storage by standardising the data structure.
- Updated navigation links to use buttons instead of anchor tags to prevent default link behaviour and ensure proper redirection.
- Added comments and documentation to the code for better readability and maintainability.

## References
- Bose, S. (2023, October 2). What is the Ideal Screen Size for Responsive Design | BrowserStack. BrowserStack. https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
- Contributors, M. O. J. T. a. B. (n.d.). Progress. https://getbootstrap.com/docs/4.0/components/progress/
- Convert string to Title Case with JavaScript. (n.d.). Stack Overflow. https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
- Date - JavaScript | MDN. (2024, June 5). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- dcode. (2020, August 24). Build a Single Page Application with JavaScript (No Frameworks) [Video]. YouTube. https://www.youtube.com/watch?v=6BozpmSjk-Y
- dcode. (2021, July 8). Build a Notes App with JavaScript & Local Storage (No Frameworks) [Video]. YouTube. https://www.youtube.com/watch?v=01YKQmia2Jw
- dcode. (2022, November 2). How to Detect User Input with JavaScript [Video]. YouTube. https://www.youtube.com/watch?v=TuDp9m1zYww
- FormData - Web APIs | MDN. (2024, March 6). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/FormData
- Lachyjp. (n.d.). GitHub - lachyjp/GetUp: A simple balance tracker for members of Up Bank, an Australian neobank. GitHub. https://github.com/lachyjp/GetUp
- Sagar Developer. (2021, March 2). AUTO CHANGING BACKGROUND IMAGE USING HTML AND CSS || SOURCE CODE [Video]. YouTube. https://www.youtube.com/watch?v=IwEqvjsDVU0
- Using the Fetch API - Web APIs | MDN. (2023, August 18). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- W3Schools.com. (n.d.-a). https://www.w3schools.com/js/js_validation.asp
- W3Schools.com. (n.d.-b). https://www.w3schools.com/js/js_api_intro.asp
- Window: localStorage property - Web APIs | MDN. (2023, April 8). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## Acknowledgment and Reference of Generative AI Usage

### Use of Generative AI Technologies
In the development of this project, I used generative artificial intelligence (AI) tools to enhance the efficiency and problem-solving of my work. Specifically, I utilised:
- **OpenAI's ChatGPT**: This AI tool was extremely valuable, aiding in major code debugging, refactoring, simplifying existing code for improved clarity, and helping with understanding and implementing complex functions and algorithms.
- **Google’s Gemini**: This tool played in providing relevant links to online resources and tutorials for deeper understanding and faster indexing. Furthermore, Gemini also helped streamline the development process by suggesting code snippets and structures, accelerating the implementation of various features which ensured the best practices.
- **Grammarly**: Assisted in ensuring grammatical accuracy within the written read.me content.

### Prompts Provided to AI Tools
Some of the specific prompts provided to the AI tools include:

#### Coding Construction
- "The buttons in my activities and additional cost don’t work to create another form to fill out and put inside the array. What do I have to do to get it to work?”
- “Good, I like this logic apply this logic for my destinations and accommodation and put the data in an array in the local storage the same way.”

#### Debugging
- "I'm getting an error in my newTrip.js: TypeError: Cannot read properties of null (reading 'addEventListener') at HTMLDocument.anonymous (newTrip.js:98:18)”
- "My code is getting too complicated. I want you to remove the adding on extra forms for destination and accommodation out of my code only keeping it for the bottom activities and additional costs remove all the unnecessary code for this.”

#### Refactoring
- "Can you refactor the eventListeners.js so it is cleaner and better without breaking anything on the other pages?”
- " I want you to put the index.css and integrate it into my layout.scss”

#### Assistance with Complicated Functions
- "So I want to save all the data I collect from this form from the inline html in my JavaScript file called newTrip.js which is a single page architecture application for tracking trips, how can I do this simply, when I click the a tag link that navigates to the savedTrips without breaking my code or removing anything."
- "I want you to display the data in savedTrips.js only and I want the finish button in newTrip.js to link to the savedTrips.js `li class="nav-item"> a class="nav-link" href="/savedtrips">Saved Trips`”

#### Providing Links to Resources and Tutorials
- "Give me the link to a tutorial on how to integrate the fetch API for one with every country in the world in JavaScript."
- "Give me a video tutorial that explains how to make a simple single-page architecture website without using any frameworks.”

#### General Assistance and Support
- "Can an `a` link be used as a button and have an event listener that allows me to click that button, have it save a form I created into the local storage and then redirect me to another page (this is all done in a single page architecture) or should I use a button tag”
- "How do I make a hamburger menu responsive for mobile in HTML”
