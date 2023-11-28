// passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as AppleStrategy } from '@apple/auth-provider-express';
import {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,backend_url} from "./constants.js"

import User from './models/user.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});




// const FACEBOOK_APP_ID = "156929757483476"
// const FACEBOOK_APP_SECRET = "ec3d81f633ea419e8f8308c2008287c7"
// const callback = backend_url + "/oauth/google/callback"


// Google Strategy
passport.use(new GoogleStrategy({

    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://unifind-backend.onrender.com/oauth/google/callback", 
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', 
    scope: ['profile', 'email'], 
  
  }, async (accessToken, refreshToken, profile, done) => {
    try {

      const google = profile.id
      let user = await User.findOne({google});
      if (!user) {
        user = new User({ google: profile.id, userName: profile.displayName });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));



export default passport;
