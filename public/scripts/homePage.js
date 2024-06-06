import AbstractView from "./AbstractView.js";

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
        </head>

        <body>
            <div class="hero mt-4">
                <div class="hero-text">
                    <h1>Your Next Adventure Awaits!</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <a href="/newtrip" class="btn btn-primary" data-link>Start Planning!</a>
                </div>
            </div>
        
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <script>
            </script>
        </body>
        `;
    }
}
