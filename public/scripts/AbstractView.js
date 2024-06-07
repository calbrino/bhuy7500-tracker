//abstractView.js

import logoSrc from '../src/logo.png';

export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }

    async init() {
        // Initialize view-specific elements
    }

    async render() {
        const viewHtml = await this.getHtml();

        const mainContainer = document.createElement('div');
        mainContainer.innerHTML = `
            <div class="Section_top"></div> <!-- background animation -->
            <header>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a class="navbar-brand" href="/homepage">
                            <img id="logoImage" src="${logoSrc}" height="30" alt="Di Trip Planner Logo">
                        </a>
                        <div class="navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="/newtrip" data-link>New Trip</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/savedtrips" data-link>Saved Trips</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main id="view-content"></main>
        `;

        const viewContent = mainContainer.querySelector('#view-content');
        viewContent.innerHTML = viewHtml;

        const appElement = document.querySelector('#app');
        if (appElement) {
            appElement.innerHTML = ''; // Clear the existing content
            appElement.innerHTML = mainContainer.outerHTML;
        } else {
            console.error("App element not found");
        }

        await this.init();
    }
}
