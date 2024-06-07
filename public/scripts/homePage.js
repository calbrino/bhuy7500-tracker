// homePage.js

import AbstractView from "./abstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Di - Home Page");
    }

    async getHtml() {
        return `
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="public/index.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="public/index.css">
        </head>

        <body class="home-page">
            <div class="hero">
                <div class="container">
                    <div class="hero-text">
                        <h1>Your Next Adventure Awaits!</h1>
                        <h5>Explore the world and create lasting memories with Di, your personalised trip planning application! </h5> <br>
                        <p> Di (Vietnamese for go!) is a single-page web application that helps you seamlessly track travel plans and effortlessly craft detailed itineraries for any occasion. 
                            Whether you're seeking adventure with friends, relaxation with your significant other, or seeking cultural experiences with your family, Di is your ultimate travel companion.
                            Start planning your dream trip with Di today!</p>

                       <div class="hero-button"> <a href="/newtrip" class="btn btn-primary" data-link>Start Planning!</a> </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        `;
    }

    async init() {
        super.init();
    }
}
