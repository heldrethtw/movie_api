const mongoose = require('mongoose');
const express = require('express');
const {User,Movie,Genre,Director} = require('./models');
const morgan = require('morgan');
const tmbdRoutes = require('./routes/tmbdRoutes');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost 27017/donkeyDB',{ useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tmbd', tmbdRoutes);


app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});


