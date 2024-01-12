const {MongoClient} = require('mongodb');
const {MONGO_URI} = require('./config');
const assert = require('assert');

async function main() {
    const client = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log('connected to MongoDB!');
        const db = client.db('donkeyDB');
        const collection = db.collection('movies');
        const movies = await collection.find().toArray();
        console.log(movies);
       
    }catch(error){
        console.error('An error occured connecting to MongoDB', error);
    }finally{
        await client.close();
    }
}

main().catch(console.dir);
