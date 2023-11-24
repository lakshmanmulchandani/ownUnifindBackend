import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import items from "./routes/items.js";
import passport from './passport.js';
import session from 'express-session';
import oauth from "./routes/oauth.js"


const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


// Set up session
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("This is Lost and Found API");
});
app.use("/user", userRoutes);
app.use("/items", items);
app.use("/oauth",oauth)

const PORT = process.env.PORT || 5000;


const db = "mongodb+srv://lostAndFound:cK0AzTcTOQT3SaEQ@cluster0.sffd2px.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));












