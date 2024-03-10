import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Movie } from './models/schemas.js';
import moviesData from './movies.json' assert { type: "json" };

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error:'));

async function importMovies() {
    try {
        for (const movieItem of moviesData) {
            const movie = new Movie(movieItem);
            await movie.save();
        }
        console.log('Movies imported');

    } catch (error) {
        console.error('Error importing movies:', error);
    } finally {
        mongoose.disconnect();
    }
}

importMovies();