
 // Access the DOM elements
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchShow = document.getElementById("show");

// Unsplash API key (replace this with your actual API key)
const UNSPLASH_API_KEY = "YOUR_UNSPLASH_API_KEY"; // Replace this with your key
const UNSPLASH_URL = "https://api.unsplash.com/search/photos?per_page=10&query=";

// Handle the form submission
searchForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the page from reloading on submit

    // Get the search query entered by the user
    const query = searchBox.value.trim();

    if (query) {
        // Clear the search result area before fetching new results
        searchResult.innerHTML = "Loading...";

        // Fetch images from Unsplash API
        fetch(`${UNSPLASH_URL}${query}&client_id=${UNSPLASH_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                // Check if results were returned
                if (data.results && data.results.length > 0) {
                    searchResult.innerHTML = ""; // Clear previous content
                    data.results.forEach(image => {
                        const imgElement = document.createElement("img");
                        imgElement.src = image.urls.small; // Image URL (small size)
                        imgElement.alt = image.alt_description || "Image from Unsplash";
                        imgElement.classList.add("search-image");
                        searchResult.appendChild(imgElement);
                    });
                } else {
                    searchResult.innerHTML = "<p>No results found.</p>";
                }
            })
            .catch(error => {
                searchResult.innerHTML = "<p>Error fetching data.</p>";
                console.error("Error fetching data from Unsplash:", error);
            });
    } else {
        searchResult.innerHTML = "<p>Please enter a search term.</p>";
    }
});

// Optional: Add a "Show Results" functionality (if you want to toggle results)
searchShow.addEventListener("click", function() {
    const currentState = searchResult.style.display;
    searchResult.style.display = currentState === "none" || currentState === "" ? "block" : "none";
});
