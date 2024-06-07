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
            <div class="Section_top"></div> <!-- background animation -->
            <div class="hero">
                <div class="container">
                    <div class="hero-text">
                        <h1>Your Next Adventure Awaits!</h1>
                        <p>Discover new destinations, create unforgettable memories, and embark on 
                        the journey of a lifetime with our personalised trip planning service. 
                        Whether you're seeking adventure, relaxation, or cultural experiences, we've got you covered.</p>
                        <a href="/newtrip" class="btn btn-primary" data-link>Start Planning!</a>
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
