import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import './passport.js';
import { config } from 'dotenv';
import { connect } from 'mongoose';

import passport from 'passport';


import tmbdRoutes from './routes/tmbdRoutes.js';


config();

connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donkeyDB')
.then(() => console.log('Connected to MongoDB with Mongoose'))
.catch(error => console.error('Error connecting to MongoDB:', error));

const app = express();



app.use(morgan('common'));
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/tmbd', tmbdRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});


