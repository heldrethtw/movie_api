import mongoose from 'mongoose';
import { Movie, Genre, Director } from './models.js';

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
        console.error('Error improting movies:', error);
    } finally {
        mongoose.disconnect();
    }
}

importMovies();