// 1. Configuration & Selectors
const API_KEY = '25c10fd18d34fdfa2ba12986166c76fa'; // Replace with your real key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.querySelector(".movie-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const mylist = document.getElementById("mylist-grid");
const emptyListMessage = document.getElementById("empty-list-message");

let savedlist = JSON.parse(localStorage.getItem("mylist")) || [];

// 2. Fetch Movies from TMDB
async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();
        renderHomeMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

async function fetchSearchMovies(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        fetchMovies();
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}`);
        const data = await response.json();
        renderHomeMovies(data.results);
    } catch (error) {
        console.error("Error searching movies:", error);
    }
}

if (searchButton) {
    searchButton.addEventListener("click", () => fetchSearchMovies(searchInput.value));
}

if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            fetchSearchMovies(searchInput.value);
        }
    });
}

// 3. Render Home Page Movies
function renderHomeMovies(movies) {
    if (!movieContainer || movieContainer.id === "mylist-grid") return;

    movieContainer.innerHTML = ""; // Clear loader if any

    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = `<div class="no-results">No movies found. Try another search.</div>`;
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        
        // TMDB uses 'title' for movies and 'name' for TV shows
        const title = movie.title || movie.name;
        const rating = Math.round(movie.vote_average * 10); // Convert to %
        const posterPath = movie.poster_path ? IMAGE_URL + movie.poster_path : 'fallback-image.jpg';

        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${title} Poster" class="poster">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rating">${rating}% Match</span>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                <p>${movie.overview}</p>
                <button class="add-list-btn">+ My List</button>
            </div>
        `;

        // Add event listener directly to the button
        movieCard.querySelector(".add-list-btn").addEventListener("click", () => {
            addToList({
                moviename: title,
                rating: rating + "%",
                overview: movie.overview,
                image: posterPath
            });
        });

        movieContainer.appendChild(movieCard);
    });
}

// 4. Add to List Logic
const addToList = (movie) => {
    const alreadyExists = savedlist.some(m => m.moviename === movie.moviename);
    
    if (alreadyExists) {
        alert("Movie already added to list");
        return;
    }

    savedlist.push(movie);
    localStorage.setItem("mylist", JSON.stringify(savedlist));
    alert("Movie added to list");
};

// 5. Render "My List" Page
const renderMyList = () => {
    if (!mylist) return;

    if (savedlist.length > 0) {
        if (emptyListMessage) emptyListMessage.style.display = "none";
        mylist.innerHTML = "";

        savedlist.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML = `
                <img src="${movie.image}" alt="${movie.moviename} Poster" class="poster">
                <div class="movie-info">
                    <h3>${movie.moviename}</h3>
                    <span class="rating">${movie.rating}</span>
                </div>
                <div class="overview">
                    <h4>Overview</h4>
                    <p>${movie.overview}</p>
                    <button class="remove-list-btn">Remove from List</button>
                </div>
            `;
            
            card.querySelector(".remove-list-btn").onclick = () => removeCard(card, movie.moviename);
            mylist.appendChild(card);
        });
    } else {
        if (emptyListMessage) emptyListMessage.style.display = "block";
    }
};

// 6. Remove Card Logic
const removeCard = (cardElement, movieName) => {
    savedlist = savedlist.filter(m => m.moviename !== movieName);
    localStorage.setItem("mylist", JSON.stringify(savedlist));
    cardElement.remove();

    if (savedlist.length === 0 && emptyListMessage) {
        emptyListMessage.style.display = "block";
    }
};

// Initialize
fetchMovies();
renderMyList();