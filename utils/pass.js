'use strict';
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
        delete user.password;
        return done(null, {...user}, {message: 'Logged In Successfully'}); 
      }
      catch (err) {
        return done(err);
      }
    }));

// JWT strategy for handling bearer token
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: '123qwer',
    },
    async (jwtPayload, done) => {

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload

      const user = await userModel.getUser(jwtPayload.user_id);
      const plainUser = {...user};
      console.log('jwt', jwtPayload, plainUser);
      if (plainUser.user_id) {
        return done(null, plainUser);
      } else {
        return done(null, false);
      }
    },
));

module.exports = passport;
