const moviesInnerContent = document.getElementById('moviesInner_content')
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');


async function getMovies(){
    try{
        const response = await fetch(`http://localhost:3000/movies/${filmId}`);
        moviesInfo = await response.json()
        console.log(moviesInfo);
        const movieInner =  `
            <div class="moviesInner_content_info">
                <div class="moviesInner_content_info_item">
                    <h1 class="filmTitle">
                        ${moviesInfo.title}
                    </h1>
                </div>
                <div class="moviesInner_content_info_item">
                    <h3 class="moviesInner_content_info_item_head">
                        Description
                    </h3>
                    <p class="moviesInner_content_info_item_text">
                        ${moviesInfo.desc}
                    </p>
                </div>
                <div class="moviesInner_content_info_item">
                    <h3 class="moviesInner_content_info_item_head">
                        Year
                    </h3>
                    <p class="moviesInner_content_info_item_text">
                        ${moviesInfo.year}
                    </p>
                </div>
                <div class="moviesInner_content_info_item">
                    <h3 class="moviesInner_content_info_item_head">
                        Category
                    </h3>
                    <p class="moviesInner_content_info_item_text">
                        ${moviesInfo.category}
                    </p>
                </div>
            </div>
            <div class="moviesInner_content_buttons">
                <a href="${moviesInfo.imdbLink}" target='_blank' class="btn">
                    Go Movie
                </a>
                <a href="#" class="btn" id="edit_film">
                    Edit
                </a>
                <a href="#" class="btn" id="delete_film" data-id='${moviesInfo.id}'>
                    Delete
                </a>
            </div>
            <div class="moviesInner_content_image">
                <img class="moviesInner_content_image--img" src="${moviesInfo.imageLink}" alt="">
            </div>
            <div class="inner_overlay"></div>
        `
        moviesInnerContent.innerHTML = movieInner;

        //delete movie
        const deleteButton = document.getElementById('delete_film')
        deleteButton.addEventListener('click' , () =>{
            deleteFilm(filmId)
            window.location.href = '/'
        })
    }
    catch (error) {
        console.log(error);
    }
}
getMovies()


function deleteFilm(id) {
    fetch(`http://localhost:3000/movies/${id}` , {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Film deletion failed');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}