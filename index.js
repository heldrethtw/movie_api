import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import passport from 'passport';
import { json, urlencoded } from 'express';
import './passport.js';
import authRoutes from './auth.js';
import tmbdRoutes from './routes/tmbdRoutes.js';


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
app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running! Welcome to the Movie API!'
    });
});

app.use('/api/tmbd', tmbdRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0',() => {
    console.log(`Your app is listening on port ${port}.`);
});


