import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }));
app.use(cors());

console.log('connection', process.env.CONNECTION_URL);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
// const CONNECTION_URL = 'mongodb+srv://HimanshuMastery:Kunwar123@cluster0.6sfojen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT  =  5000;
const CONNECTION_URL = process.env.CONNECTION_URL;
// server/index.js
// app.use((req, res, next) => {
//     console.log('Incoming Request:', req.method, req.url, req.headers['content-type'], req.body);
//     next();
//   });
  

mongoose.connect(CONNECTION_URL)
.then(()=> app.listen(PORT, ()=> console.log(`Server running on Port : ${PORT}`)))
.catch((error)=> console.log(error))

//https://www.mongodb.com/

