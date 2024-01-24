import { connect } from 'mongoose';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import tmbdRoutes from './routes/tmbdRoutes.js';
import { config } from 'dotenv';

config();

connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donkeyDB');

const app = express();


app.use(morgan('common'));
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/tmbd', tmbdRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});


