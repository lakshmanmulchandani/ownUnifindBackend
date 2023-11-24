// authRoutes.js
import express from 'express';
import passport from 'passport';
import  Jwt  from 'jsonwebtoken';

const router = express.Router();

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT token with user information
    const user = req.user
 
    const token = Jwt.sign({ google: user.google , userName:user.userName, id: user._id }, "jwt-secret");

    if(user.orgId===388)
    {
     console.log("coming here")
        res.redirect(`http://localhost:3000/details?token=${token}&user=${user}`);
        return
    }

    res.redirect(`http://localhost:3000/?token=${token}&user=${user}`);
    
    
  });

// // Facebook authentication
// router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

// router.get('/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: 'http://localhost:3000',
//   failureRedirect: 'http://localhost:3000',
// }));

// // Apple authentication
// router.get('/apple', passport.authenticate('apple'));

// router.post('/apple/callback', passport.authenticate('apple', {
//   successRedirect: 'http://localhost:3000/success',
//   failureRedirect: 'http://localhost:3000/failure',
// }));

export default router;
