const movies = [
    {
        moviename: "stranger things",
        rating: "98%",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        image: "Images/stranger_things.jpg"
    },
    {
        moviename: "squid game",
        rating: "96%",
        overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
        image: "Images/squid_game.jpg"
    },
    {
        moviename: "the witcher",
        rating: "91%",
        overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        image: "Images/witcher.jpg"
    },
    {
        moviename: "money heist",
        rating: "94%",
        overview: "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.",
        image: "Images/money_heist.jpg"
    },
    {
        moviename: "wednesday",
        rating: "97%",
        overview: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree and solve a supernatural mystery.",
        image: "Images/wednesday.jpg"
    },
    {
        moviename: "black mirror",
        rating: "89%",
        overview: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
        image: "Images/black_mirror.jpg"
    },
    {
        moviename: "the flash",
        rating: "89%",
        overview: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
        image: "Images/The flash.jpg"
    },
    {
        moviename: "shelter the movie",
        rating: "89%",
        overview: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
        image: "Images/shelter the movie.jpg"
    }];

const movieContainer = document.querySelector(".movie-container");
const mylist = document.getElementById("mylist-grid");
const emptyListMessage = document.getElementById("empty-list-message");

// Populate the Home page movies
if (movieContainer && movieContainer.id !== "mylist-grid") {
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.moviename} Poster" class="poster">
            <div class="movie-info">
                <h3>${movie.moviename}</h3>
                <span class="rating">${movie.rating} Match</span>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                <p>${movie.overview}</p>
                <!-- Click to call the 'list' function with the movie name -->
                <button class="add-list-btn" >+ My List</button>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}

let mylistbtn = document.querySelectorAll(".add-list-btn");

let savedlist = JSON.parse(localStorage.getItem("mylist")) || [];

// The "list" function to add a movie to the list grid
mylistbtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        // Find the movie data from the array
        const movie = movies[index];

        const alreadyExists = savedlist.some(m => m.moviename === movie.moviename);
        if (alreadyExists) {
            alert("Movie already added to list");
            return;
        }

        savedlist.push(movie);
        store();
    });
});

if (mylist && savedlist.length > 0) {
    // Hide empty message if it's there
    if (emptyListMessage) emptyListMessage.style.display = "none";
    
    // Create the new card for the My List grid
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
                <button class="remove-list-btn" onclick="removeCard(this)">Remove from List</button>
            </div>
        `;
        mylist.appendChild(card);
    });
} else if (mylist && savedlist.length === 0) {
    if (emptyListMessage) emptyListMessage.style.display = "block";
}

// Remove function to remove a card from the grid
const removeCard = (button) => {
    const card = button.closest(".movie-card");

    if (card) {
        const titleElement = card.querySelector("h3");
        if (titleElement) {
            savedlist = savedlist.filter(m => m.moviename !== titleElement.innerText);
            localStorage.setItem("mylist", JSON.stringify(savedlist));
        }
        card.remove();
    }
    
    // If list is empty again, show the message
    if (mylist && mylist.children.length === 0) {
        if (emptyListMessage) emptyListMessage.style.display = "block";
    }
};

const store = () => {
    localStorage.setItem("mylist", JSON.stringify(savedlist));
    alert("Movie added to list");
};



