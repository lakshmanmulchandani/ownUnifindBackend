// passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as AppleStrategy } from '@apple/auth-provider-express';
import User from './models/user.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const GOOGLE_CLIENT_ID = "360421334611-8tbsqbnufgmep726qtsjh247kr8rjjjv.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

// const FACEBOOK_APP_ID = "156929757483476"
// const FACEBOOK_APP_SECRET = "ec3d81f633ea419e8f8308c2008287c7"

// Google Strategy
passport.use(new GoogleStrategy({

    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/oauth/google/callback', 
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', // Add this line
    scope: ['profile', 'email'], // Add 'email' scope
  
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

// Facebook Strategy
// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: 'http://localhost:5000/oauth/facebook/callback',
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOrCreate({ facebookId: profile.id }, (err, user) => {

// console.log(user)
// console.log(profile)
    
//     return done(err, user);
//   });
// }));

// // Apple Strategy
// passport.use(new AppleStrategy({
//   clientID: APPLE_CLIENT_ID,
//   teamId: APPLE_TEAM_ID,
//   callbackURL: 'http://localhost:5000/auth/apple/callback',
//   keyId: APPLE_KEY_ID,
//   privateKeyPath: 'path/to/your/private-key.p8',
//   scope: ['name', 'email'],
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOrCreate({ appleId: profile.id }, (err, user) => {
//     return done(err, user);
//   });
// }));

export default passport;
