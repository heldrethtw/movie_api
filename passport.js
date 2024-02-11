import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models';
Models = require('./models.js');
passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
},
    async (username, password, callback) => {
        console.log(`${username} ${password}`);
        await User.findOne({ Username: username })
            .then((user) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, { message: 'Incorrect username.' });
                }
                console.log('finished');
                return callback(null, user);
            })
            .catch((error) => {
                console.log('error');
                return callback(error);
            });
    }));

use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    async (jwtPayload, callback) => {
        return await User.findById(jwtPayload._id)
            .then((user) => {
                return callback(null, user);
            })
            .catch((error) => {
                return callback(error);
            });
    }));
