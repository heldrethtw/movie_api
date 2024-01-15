
import express from 'express';
import morgan from 'morgan';
import tmbdRoutes from './tmbdRoutes';

const app = express();
const port = 3000;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', tmbdRoutes);

app.use((req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}.`);
});