import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

let movieSchema = new Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    NewGenres: [{ type: String, required: false }],
    NewDescriptions: [{ type: String, required: false }]
});


let genreSchema = new Schema({
    Name: { type: String, required: true },
    Description: [{ type: String, required: true }]
});

let directorSchema = new Schema({
    Name: { type: String, required: true },
    Bio: { type: String, required: true },
    Birth: { type: String, required: true },
    Death: { type: String, required: false }
});

let userSchema = new Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: { type: Date, required: true },
    Favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    Suggestions: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    Role: { type: String, default: 'user' }
});

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.Password);
};


export const Movie = model('Movie', movieSchema);
export const User = model('User', userSchema);
export const Genre = model('Genre', genreSchema);
export const Director = model('Director', directorSchema);


