const mongoose = require('mongoose');
let movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
        Name: String,
        Description: String,
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String,
        Death: String,
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' }
    },
   genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    director_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
   
});

let genreSchema = new mongoose.Schema({
    Name: {type:String,required:true},
    Description: {type:String,required:true}        
});

let directorSchema = new mongoose.Schema({
    Name: {type:String,required:true},
    Bio: {type:String,required:true},
    Birth: {type:String,required:true},
    Death: {type:String,required:false}
});

let userSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Birth:Date
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre',genreSchema);
let Director = mongoose.model('Director',directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;