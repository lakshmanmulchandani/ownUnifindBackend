// authRoutes.js
import express from 'express';
import passport from 'passport';
import  Jwt  from 'jsonwebtoken';
// import { frontend_url } from '../constants.js';
import { JWT_SECRET } from '../constants.js';
const frontend_url = "https://unifind.netlify.app/login"

const router = express.Router();

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    
    try {

      const user = req.user
    console.log(user)
    const token = Jwt.sign({ google: user.google , userName:user.userName, id: user._id }, JWT_SECRET );

    if(user.orgId===388)
    {
     console.log("coming here")
        res.redirect(`${frontend_url}/details?token=${token}&user=${user}`);
        return
    }

    res.redirect(`${frontend_url}/?token=${token}&user=${user}`);
    
      
    } catch (error) {
      console.log(error)
    }
    
    
  });


export default router;
