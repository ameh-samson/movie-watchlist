// Selecting DOM elements
const form = document.querySelector(".search-section");
const searchInput = document.querySelector(".search-input");
const searchResultPopulatedDiv = document.querySelector(
  "#search-result-populated-state"
);
const noDataStateContent = document.querySelector(".no-data-state-content");
const searchResultInitialState = document.querySelector(
  ".search-result-initial-state"
);

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchName = searchInput.value;
  fetchMovies(searchName);
});

// Asynchronous function to fetch movies
async function fetchMovies(searchName) {
  // Fetching search results from OMDB API
  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchName}&apikey=88c7218c`
  );
  const data = await response.json();

  // Checking if search results are available
  if (data.Search) {
    searchResultInitialState.style.display = "none";
    noDataStateContent.style.display = "none";
    // Extracting movie titles from search results
    const searchNames = data.Search.map((movie) => movie.Title);
    // Fetching details for each movie
    await fetchMovieDetails(searchNames);
  } else {
    searchResultInitialState.style.display = "none";
    noDataStateContent.style.display = "block";
  }
}

// Asynchronous function to fetch details for each movie
async function fetchMovieDetails(searchNames) {
  for (let searchName of searchNames) {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${searchName}&apikey=88c7218c`
    );
    const movie = await response.json();

    if (movie.Title) {
      renderMovieDetails(movie);
    }
  }
}

// Function to render movie details
function renderMovieDetails(movie) {
  const html = `
      <div class="movie-details">
        <img class="movie-img" src="${movie.Poster}" alt="" />
        <div class="movie-details-inner-div">
          <div>
            <p class="movie-details-title">${movie.Title}</p>
            <p class="type">Type: ${movie.Type}</p>
          </div>
  
          <div class="movie-genre">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <p>
              <i class="fa-solid fa-plus add-btn"></i>
              Watchlist
            </p>
          </div>
          <p class="movie-description">
            ${movie.Plot}
          </p>
        </div>
      </div>
    `;

  // Append HTML content to the search result container
  searchResultPopulatedDiv.innerHTML += html;
}

function addToWatchlist(movieTitle) {
  // Assuming you have a div with the ID "watchlist" to append movies
  const watchlistDiv = document.getElementById("watchlist");

  const watchlistHtml = `
      <div class="watchlist-item">
        <p>${movieTitle}</p>
        <!-- Add any additional details or styling here -->
      </div>
    `;

  // Append HTML content to the watchlist container
  watchlistDiv.innerHTML += watchlistHtml;
}
