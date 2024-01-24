const mongoose = require('mongoose');
const { Movie, User } = require('./models');
const moviesData = require('./movies.json');
const usersData = require('./users.json');

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB with Mongoose');

        const moviesCount = await Movie.countDocuments();
        if (moviesCount === 0) {
            await Movie.insertMany(moviesData);
            console.log(`${moviesData.length} movies inserted!`);
        } else {
            console.log('Movies already exist');
        }

        const usersCount = await User.countDocuments();
        if (usersCount === 0) {
            await User.insertMany(usersData);
            console.log(`${usersData.length} users inserted!`);
        } else {
            console.log('Users already exist');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
    }
}

main().catch(console.error);
