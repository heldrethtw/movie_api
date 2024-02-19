// Desc: This file contains the configuration for the application
import dotenv from 'dotenv';

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
        allowedOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']
    }
};






export default config;