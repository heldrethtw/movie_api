import { Router } from 'express';
import { searchMovies, fetchMovieDetails } from './tmdbApi';
const router = Router();    

router.get('/search', async (req, res) => {
    try{
        const { title } = req.query;
        const results = await searchMovies(title);
        res.json(results);
    } catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/details/:id', async (req, res) => {
    try{
        const { movieID } = req.params;
        const details = await fetchMovieDetails(movieID);
        res.json(details);
    }catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/movies/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const movies = await db.collection('movies').find({ title: name }).toArray();
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


router.get('/movies/genre/:genre', async (req, res) => {
    try{
        const { genre } = req.params;
        const movies = await db.collection('movies').find({'genre.name': genre }).toArray();
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});


router.get('/movies/genre/:genre/director/:director', async (req, res) => {
    try{
        const { genre, director } = req.params;
        const movies = await db.collection('movies').find({'genre.name': genre, 'director.name': director }).toArray();
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-description/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { newDescription } = req.body;
        await db.collection('movies').updateOne({ _id: ObjectId(id) }, { $set: { description: newDescription } });
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('movies/update-director-bio/:director', async (req, res) => {
    try{
        const { director } = req.params;
       const { newBio } = req.body;
       await db.collection('movies').updateOne({ 'director.name': director }, { $set: { 'director.bio': newBio } });
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('users/:username/add-favorite', async (req, res) => {
    try{
        const { username } = req.params;
        const movieID = req.body;
        await db.collection('users').updateOne({ username: username }, { $push: { favorites: movieID } });
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.delete('/users/:usersname', async (req, res) => {
    try{
        const { username } = req.params;
        await db.collection('users').deleteOne({ username: username });
        res.json(genre);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});




