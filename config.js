require('dotenv').config();

const config = {
    TMBD_API_KEY: process.env.TMBD_API_KEY,
    MONGO_URI: process.env.MONGO_URI
};



module.exports = config;