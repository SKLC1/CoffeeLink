import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { usersRouter } from './routes/users.js';
import { hrUsersRouter } from './routes/hrUsers.js';
import { jobsRouter } from './routes/jobs.js';
import bodyParser from 'body-parser';


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('Connected to db'))

// app.use(express.json())
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/hr_users', hrUsersRouter)
app.use('/jobs', jobsRouter)

app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`);
})