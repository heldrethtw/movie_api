import mongoose from 'mongoose';
import { Movie } from './models.js';
import moviesData from './movies.json' assert { type: "json" };


mongoose.connect('mongodb://localhost:27017/donkeyDB');

mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error:'));

async function importMovies() {
    try{
        for(const movieItem of moviesData) {
            const movie = new Movie(movieItem);
            await movie.save();
        }
        console.log('Movies imported');

    } catch(error) {
        console.error('Error importing movies:', error);
    } finally {
        mongoose.disconnect();
    }
}

importMovies();