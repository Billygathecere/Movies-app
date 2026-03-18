const movies = [
    {
    moviename:"stranger things",
    rating:"98%",
    overview:"When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    image:"Images/stranger_things.jpg"
},
{
    moviename:"squid game",
    rating:"96%",
    overview:"Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    image:"Images/squid_game.jpg"
},
{
    moviename:"the witcher",
    rating:"91%",
    overview:"Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    image:"Images/witcher.jpg"
},
{
    moviename:"money heist",
    rating:"94%",
    overview:"To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.",
    image:"Images/money_heist.jpg"
},
{
    moviename:"wednesday",
    rating:"97%",
    overview:"Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree and solve a supernatural mystery.",
    image:"Images/wednesday.jpg"
},
{
    moviename:"black mirror",
    rating:"89%",
    overview:"An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    image:"Images/black_mirror.jpg"
},
{
    moviename:"the flash",
    rating:"89%",
    overview:"An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    image:"Images/The flash.jpg"
},
{
    moviename:"shelter the movie",
    rating:"89%",
    overview:"An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    image:"Images/shelter the movie.jpg"
}];

const movieContainer = document.querySelector(".movie-container");

movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <img src="${movie.image}" alt="${movie.moviename} Poster" class="poster">
        <div class="movie-info">
            <h3>${movie.moviename}</h3>
            <span class="rating">${movie.rating}</span>
        </div>
        <div class="overview">
            <h4>Overview</h4>
            <p>${movie.overview}</p>
        </div>
    `;
    movieContainer.appendChild(movieCard);
});