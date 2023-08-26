const moviesContent = document.getElementById('movies_content');
const searchInput = document.getElementById('search');



async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:3000/movies');
        movies = await response.json();
        displayMovies(movies)
    } catch (error) {
        console.log(error);
    }
}


function displayMovies(movies) {
    if (movies.length === 0) {
        moviesContent.innerHTML = 'No results found!';
        moviesContent.style.color = 'red'
    } else {
        movieItem = movies.map(item => `
            <a href="filmInner.html?id=${item.id}" class="movies_content_item">
                <div class="movies_content_item_cont">
                    <div class="movies_content_item_image">
                        <div class="box pd_t150">
                            <div class="box_item">
                                <img class="movies_content_item_image--img" src="${item.imageLink}" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="movies_content_item_title">
                        ${item.title}
                    </div>
                    <div class="overlay"></div>
                </div>
            </a>
        `).join('');
        moviesContent.innerHTML = movieItem
    }
}


searchInput.addEventListener('input' , function () {
    const searchInputValue = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchInputValue)
    );
    displayMovies(filteredMovies)
})

fetchMovies()
