import {MongoClient} from 'mongodb';
import config from './config';

const apiKey = config.TMBD_API_KEY;
const MONGO_URI = config.MONGO_URI;
const client = new MongoClient(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



let db;

const connectToDB = async () => {
    try {
        await client.connect();
        db = client.db('donkeyDB');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
};

const getDB = () => {
   if (!db) {
       throw new Error('No database found. Make sure you connect first.');
   }
    return db;
};

export { connectToDB, getDB };
