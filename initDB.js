import { config } from 'dotenv';
config();
import { connect, disconnect } from 'mongoose';
import { Movie, User } from './models.js';
import moviesData from './movies.json' assert { type: "json" };
import usersData from './users.json' assert { type: "json" };

async function main() {
    try {
        await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donkeyDB');
        console.log('Connected to MongoDB with Mongoose');

        const moviesCount = await Movie.countDocuments();
        if (moviesCount === 0) {
            await Movie.insertMany(moviesData);
            console.log(`${length} movies inserted!`);
        } else {
            console.log('Movies already exist');
        }

        for (const userData of usersData) {
            await User.findOneAndUpdate(
               { Email: userData.Email},
                userData,
                { upsert: true, new: true, setDefaultsOnInsert: true}
            );
        }
console.log(`${usersData.length} users inserted!`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await disconnect();
    }
}
main();