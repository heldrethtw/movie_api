const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('./config');
const moviesData = require('./movies.json');
const usersData = require('./users.json');


async function main() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        console.log('connected to MongoDB!');
        const db = client.db('donkeyDB');

        const moviesCollection = db.collection('movies');
        const usersCollection = db.collection('users');

        const moviesCount = await db.collection('movies').countDocuments();
        if (moviesCount === 0) {
            await db.collection('movies').insertMany(moviesData);
            console.log(`${moviesData.length} movies inserted!`);
        } else {
            console.log('movies already exist');
        }

        const movies = await moviesCollection.find().toArray();
        console.log(movies);



        const usersCount = await db.collection('users').countDocuments();
        if (usersCount === 0) {
            await db.collection('users').insertMany(usersData);
            console.log(`${usersData.length} users inserted!`);
        } else {
            console.log('users already exist');
        }

        const users = await usersCollection.find().toArray();
        console.log(users);


    } catch (error) {
        console.error('An error occurred connecting to MongoDB', error);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);
