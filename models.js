import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

let movieSchema = new Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true }
});
  

let genreSchema = new Schema({
    Name: {type:String,required:true},
    Description: {type:String,required:true}        
});

let directorSchema = new Schema({
    Name: {type:String,required:true},
    Bio: {type:String,required:true},
    Birth: {type:String,required:true},
    Death: {type:String,required:false}
});

let userSchema = new Schema({
    Username:{type:String,required:true},
    Password:{type:String,required:true},
    Email:{type:String,required:true},
    Birth:Date,
    Favorites:[{type:Schema.Types.ObjectId,ref:'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const Movie = model('Movie', movieSchema);
export const User = model('User', userSchema);
export const Genre = model('Genre', genreSchema);
export const Director = model('Director', directorSchema);
