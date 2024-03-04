
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from './models.js';
import dotenv from 'dotenv';

dotenv.config();


passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
},
    async (username, password, done) => {
        try {
            const user = await User.findOne({ Username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }


            const isMatch = await bcrypt.compare(password, user.Password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (error) {
            return done(error);
        }
    }));


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        try {
            
            const user = await User.findById(jwtPayload.Username);
            if (user) {
                console.log("User found:",user);
                return done(null, user);
            } else {
                console.log("User not found:",user);
                return done(null, false);
            }
        } catch (error) {
            console.log("Error:",error);
            return done(error);
        }
    }));

export default passport;
