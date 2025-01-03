import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import SongRouter from './src/routes/SongRouter.js';
import connectDB from './src/config/db.js';
import Connect_cloudinary from './src/config/Cloundinary.js';
import albamRouter from './src/routes/AlbamRouter.js';
import userRouter from './src/routes/UserRouter.js';
import session from 'express-session';


//app config
const app = express();
const port = process.env.PORT || 4000;
// const functions = require("firebase-functions")
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for form submissions)
connectDB(); //mongo Connection
Connect_cloudinary() //cloud-storage Connection

app.use(session({
    secret: process.env.SESS_TOKEN, // secretprocess.env.SESS_TOKEN
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

//middleware config
app.use(express.json());
app.use(cors());

//middleware config
app.use("/api/song", SongRouter)
app.use("/api/Albam", albamRouter)
app.use("/api/user", userRouter)

//init routes
app.get('/', (req, res) => res.send("API WORKING"));

// app.listen(port)


app.listen(port, () => console.log(`server started on ${port}`))