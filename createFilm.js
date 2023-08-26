const movieForm = document.getElementById('createSection_form');

movieForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(movieForm);

    const movieData = {
        title: formData.get('title'),
        desc: formData.get('desc'),
        year: formData.get('year'),
        imdbLink: formData.get('imdb_link'),
        imageLink: formData.get('image_link'),
        category: formData.get('category')
    };

    fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        })
        .then(response => {
            return response.json();
        })
        .then(createdMovie => {
            console.log('Film created:', createdMovie);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});