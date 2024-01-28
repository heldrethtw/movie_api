import { Router } from 'express';
import { Movie, User, Genre, Director } from '../models.js';

const router = Router();   

router.post('/movies', async (req, res) => {
    try {
        const newMovie = await Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/movies', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    } catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});



router.get('/movies/:id', async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(movie) {
            res.json(movie);
        } else {
            res.status(404).send('Movie not found');
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

router.put('/movies/:id', async (req, res) => {
    try{
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateMovie);
    } catch(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);  
    }
});

router.delete('/movies/:id', async (req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.send('Movie was deleted');
    } catch(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

router.post('/users', async (req, res) => {
   try {
    const newUser = User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
} catch(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
}
});



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
        const { id } = req.params;
        const details = await fetchMovieDetails(id);
        res.json(details);
    }catch(err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

router.get('/movies/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const movies = await Movie.find({ Title: name });
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


router.put('/movies/:id/description', async (req, res) => {
    try{
        const { id } = req.params;
        const {newDescription} = req.body;
        await Movie.findByIdAndUpdate(id, { Description: newDescription });
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});


router.get('/movies/genre/:genre/director/:director', async (req, res) => {
    try{
        const { genre, director } = req.params;
        const movies = await Movie.find({'Genre.Name': genre, 'Director.Name': director });
        res.json(movies);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-description/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { newDescription } = req.body;
        await Movie.findOneAndUpdate({_id: id}, { Description: newDescription });
        res.send('Movie description updated');
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-director-bio/:director', async (req, res) => {
    try{
        const { director } = req.params;
       const { newBio } = req.body;
       await Movie.updateOne({'Director.Name': director}, { 'Director.Bio': newBio });
        res.send('Director bio updated');
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.put('/movies/update-genre-description/:genre', async (req, res) => {
    try{
        const { genre } = req.params;
        const { newDescription } = req.body;
        await Movie.updateMany({'Genre.Name': genre}, { 'Genre.Description': newDescription });
        res.send('Genre description updated');
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});


router.post('/genres', async (req, res) => {
    try {
        const newGenre = new Genre(req.body);
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});


router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});


router.get('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (genre) {
            res.json(genre);
        } else {
            res.status(404).send('Genre not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});


router.put('/genres/:id', async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGenre);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});


router.delete('/genres/:id', async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.send('Genre deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

router.post('/users', async (req, res) => {
    try{
        const existingUser = await User.findOne({ Username: req.body.Username });
        if(existingUser) {
            return res.status(400).send('Username already exists');
        }
        const newUser = new User({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        });
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
        }
    });

router.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/users/:username', async (req, res) => {
    try{
        const user = await User.findOne({ Username: req.params.username });
        if(user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    }
});

router.put('/users/:username/add-favorite', async (req, res) => {
    try{
        const { username } = req.params;
        const {movieID} = req.body;
        await User.findOneAndUpdate({ Username: username }, { $addToSet: { favoriteMovies: movieID } });
        res.send(`Favorite movie added for user ${username}`);
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.delete('/users/:username', async (req, res) => {
    try{
        const { username } = req.params;
        await User.findOneAndDelete({ Username: username });
        res.send(`User ${username} was deleted`);
    }catch(err) {
        res.status(500).send('Internal server error');
    }
});

router.post('/directors', async (req, res) => {
    try{
        const directors = await Director.find();
        res.json(directors);
        res.status(201).json(directors);
    }catch(err) {
        res.status(500).send('Error: ' + err);
    }
});

router.get('/directors/:id', async (req, res) => {
    try{
        const director = await Director.findById(req.params.id);
        if(director) {
            res.json(director);
        } else {
            res.status(404).send('Director not found');
        }
    }catch(err) {
        res.status(500).send('error: ' + err);
    }
});

router.put('/directors/:id', async (req, res) => {
    try{
        await Director.findByIdAndDelete(req.params.id);
        res.send('Director deleted');
    }catch(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
});



export default router;

