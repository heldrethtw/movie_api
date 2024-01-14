const {MongoClient} = require('mongodb');
const {MONGO_URI} = require('./config');


const moviesData = require('./movies.json');

async function main() {
    const client = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log('connected to MongoDB!');
        const db = client.db('donkeyDB');
        
        const moviesCollection = db.collection('movies');
        await moviesCollection.insertMany(moviesData);
        console.log('${moviesData.length} movies inserted!');

        const usersCollection = db.collection('users');
        await usersCollection.insertMany(usersData);
        console.log('${usersData.length} users inserted!');

        const movies = await collection.find().toArray();
        console.log(movies);
       
    }catch(error){
        console.error('An error occured connecting to MongoDB', error);
    }finally{
        await client.close();
    }
}

main().catch(console.dir);
