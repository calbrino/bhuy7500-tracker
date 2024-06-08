// scripts.js
// Build a Single Page Application with JavaScript (No Frameworks) https://www.youtube.com/watch?v=6BozpmSjk-Y

import homePage from "./scripts/homePage.js";
import newTrip from "./scripts/newTrip.js";
import savedTrips from "./scripts/savedTrips.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: homePage },
        { path: "/homepage", view: homePage },
        { path: "/newtrip", view: newTrip },
        { path: "/savedtrips", view: savedTrips }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    await view.render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", async (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
