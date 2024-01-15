import { MongoClient } from 'mongodb';
import { MONGO_URI } from './config';
import moviesData from './movies.json';
import usersData from './users.json';


async function main() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        console.log('connected to MongoDB!');
        const db = client.db('donkeyDB');

        const moviesColection = db.collection('movies');
        const usersColection = db.collection('users');

        const moviesCount = await db.collection('movies').countDocuments();
        if (moviesCount === 0) {
            await db.collection('movies').insertMany(moviesData);
            console.log(`${moviesData.length} movies inserted!`);
        } else {
            console.log('movies already exist');
        }

        const movies = await moviesColection.find().toArray();
        console.log(movies);



        const usersCount = await db.collection('users').countDocuments();
        if (usersCount === 0) {
            await db.collection('users').insertMany(usersData);
            console.log(`${usersData.length} users inserted!`);
        } else {
            console.log('users already exist');
        }

        const users = await usersColection.find().toArray();
        console.log(users);


    } catch (error) {
        console.error('An error occured connecting to MongoDB', error);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);
