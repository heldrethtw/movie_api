const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const tmbdRoutes = require('./routes/tmbdRoutes');
require('dotenv').config();

const Models = require('./models');
const Movie = Models.Movie;
const User = Models.User;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost 27017/donkeyDB',{ useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
const port = 3000;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/tmbd', tmbdRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});


