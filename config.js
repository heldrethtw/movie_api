
import dotenv from 'dotenv';
import { method } from 'lodash';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    tmbdApiKey: process.env.TMBD_API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    cors: {
        allowedOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'https://donkey-archive-af41e8314602.herokuapp.com', 'http://localhost:1234', 'http://localhost:49941', 'http://localhost50855'],
        method: process.env.CORS_METHODS ? process.env.CORS_METHODS.split(',') : ['GET', 'POST', 'PUT', 'DELETE'],
    }
};






export default config;