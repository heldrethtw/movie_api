const axios = require('axios');
const {TMBD_API_KEY} = require('./config');

async function searchMovies(title) {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMBD_API_KEY}&query=${title}`);
    return response.data;
}

async function fetchMovieDetails(movieID) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`);
    return response.data;
}

module.exports = {searchMovies, fetchMovieDetails};