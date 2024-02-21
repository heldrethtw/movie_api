import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ExpressValidator } from 'express-validator';

import authRoutes from './routes/auth.js';
import './passport.js';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import passport from 'passport';
import tmbdRoutes from './routes/tmbdRoutes.js';


config();

connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

const app = express();



let allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let message = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));
app.use(morgan('common'));
app.use(ExpressValidator());
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/tmbd', tmbdRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});


