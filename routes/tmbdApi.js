const axios = require('axios');
const {be04cb8221fcfac6d3b85d6e1da9d6d2} = require('./config');

async function searchMovies(title) {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
    return response.data;
}

async function fetchMovieDetails(movieID) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`);
    return response.data;
}

module.exports = {searchMovies, fetchMovieDetails};