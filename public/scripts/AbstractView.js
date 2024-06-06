export default class {
    constructor(params) {
      this.params = params;
    }
  
    setTitle(title) {
      document.title = title;
    }
  
    async getHtml() {
      return ""; // This will be overridden in your specific view classes
    }
  
    async init() {
      // Initialize view-specific elements
    }
  
    async render() {
      const viewHtml = await this.getHtml();
  
      const mainContainer = document.createElement('div');
      mainContainer.innerHTML = `
        <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
              <a class="navbar-brand" href="/">
                <img id="logoImage" alt="Di Trip Planner Logo" height="30"> 
              </a>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="/newtrip">New Trip</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/savedtrips">Saved Trips</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      `;
  
      const viewContent = document.createElement('div');
      viewContent.innerHTML = viewHtml;
      mainContainer.appendChild(viewContent);
  
      document.body.innerHTML = mainContainer.outerHTML; 
  
      const logoImage = document.getElementById("logoImage");
  
      // Use onload event for image loading
      logoImage.onload = () => {
        logoImage.src = "/src/logo.png"; // Path relative to the HTML file
      };
  
      // If the image is already in the browser's cache, trigger onload manually
      if (logoImage.complete) {
        logoImage.onload();
      }
  
      await this.init(); 
    }
  }
  