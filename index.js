import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import passport from 'passport';
import { json, urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './passport.js';
import authRoutes from './auth.js';
import tmbdRoutes from './routes/tmbdRoutes.js';
import adminRoutes from './admin.js';
import axios, { all } from 'axios';

passport.initialize();
dotenv.config();


// connect(config.MONGO_URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB with Mongoose'))
//     .catch(error => console.error('Error connecting to MongoDB:', error));

const uri = process.env.MONGO_URI;
connect(uri)
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));


const app = express();


app.use(helmet());




app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: 'http://localhost:1234'
}));





app.use(morgan('common'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());




app.get('/', (req, res) => {
    res.json({
        message: 'Server is running! Welcome to the Donkey Archive!'
    });
});


app.use('/api/tmbd', tmbdRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Your app is listening on port ${port}.`);
});


