import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Movie } from './models/schemas.js';
import fs from 'fs';
import readline from 'readline';
import axios from 'axios';
import { param } from 'express-validator';
import { query } from 'express';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '.env')});
console.log ("TMDB_API_KEY", process.env.TMDB_API_KEY);
const TMDB_API_KEY = process.env.TMDB_API_KEY;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error:'));

async function updateMovieWithTMDbData(movie) {
    try {
        console.log(`Fetching data for movie: ${movie.Title}`);
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: movie.Title,
                language: 'en-US',
                page: 1,
                include_adult: false
            }
        });

        console.log(`API Response for ${movie.Title}:`, JSON.stringify(response.data, null, 2));

        if (response.data.results && response.data.results.length > 0) {
            const tmdbMovie = response.data.results[0];
            const imageURL = tmdbMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
                : null;
            const tmdbId = tmdbMovie.id.toString();

            console.log(`Updating movie: ${movie.Title}`);
            console.log(`New imageURL: ${imageURL}`);
            console.log(`New tmdbId: ${tmdbId}`);

            movie.imageURL = imageURL;
            movie.tmdbId = tmdbId;
            await movie.save();

            console.log(`Movie updated successfully: ${movie.Title}`);
        } else {
            console.log(`No results found for movie: ${movie.Title}`);
        }
    } catch (error) {
        console.error(`Error updating movie: ${movie.Title}`);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
}

async function importAndUpdateMovies() {
    const fileStream = fs.createReadStream('movies.json');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    try {
        for await (const line of rl) {
            const movieItem = JSON.parse(line);
            let movie = await Movie.findOne({ Title: movieItem.Title });
            if (!movie) {
                movie = new Movie(movieItem);
                await movie.save();
                console.log(`Movie inserted: ${movie.Title}`);
            }
            await updateMovieWithTMDbData(movie);
        }
        console.log("All movies updated with TMDB data");
    }catch (error) {
        console.error('Error updating movies:', error);
    }finally {
        mongoose.connection.close();
    }
}

async function updateExistingMovies() {
    try {
        const movies = await Movie.find();
        console.log(`Found ${movies.length} movies to update.`);

        for (const movie of movies) {
            console.log(`\nBefore update - Movie: ${movie.Title}`);
            console.log(`imageURL: ${movie.imageURL}`);
            console.log(`tmdbId: ${movie.tmdbId}`);

            await updateMovieWithTMDbData(movie);

            const updatedMovie = await Movie.findById(movie._id);
            console.log(`\nAfter update - Movie: ${updatedMovie.Title}`);
            console.log(`imageURL: ${updatedMovie.imageURL}`);
            console.log(`tmdbId: ${updatedMovie.tmdbId}`);

          
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('All movies updated');
    } catch (error) {
        console.error('Error updating existing movies:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
} 
  

async function main() {
    try {
        if (process.argv[2] === 'import') {
            console.log("Starting to import and update movies...");
            await importAndUpdateMovies();
            console.log("Finished importing and updating movies.");
        } else {
            console.log("Starting to update existing movies...");
            await updateExistingMovies();
            console.log("Finished updating existing movies.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}


main();

