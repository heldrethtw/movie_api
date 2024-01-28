import { config } from 'dotenv';
config();
import { connect, disconnect } from 'mongoose';
import { Movie, User } from './models.js';
import moviesData from './movies.json' assert { type: "json" };
import usersData from './users.json' assert { type: "json" };

async function main() {
    try {
        await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB with Mongoose');

        const moviesCount = await Movie.countDocuments();
        if (moviesCount === 0) {
            await Movie.insertMany(moviesData);
            console.log(`${length} movies inserted!`);
        } else {
            console.log('Movies already exist');
        }

        const usersCount = await User.countDocuments();
        if (usersCount === 0) {
            await User.insertMany(usersData);
            console.log(`${_length} users inserted!`);
        } else {
            console.log('Users already exist');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await disconnect();
    }
}

main();