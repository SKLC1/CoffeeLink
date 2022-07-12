import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { usersRouter } from './routes/users.js';
import { hrUsersRouter } from './routes/hrUsers.js';
import { jobsRouter } from './routes/jobs.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import path from 'path';
//msg
import { Msg } from './models/messages.js'
export const messagesRouter = express.Router()


dotenv.config()


//serve static assets if in prod
if(process.env.NODE_ENV){
  app.use(express.static('/client/build'))

  app.get('*',(req ,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', "index.html"))
  })
}
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('Connected to db'))

app.use(cors())
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/hr_users', hrUsersRouter)
app.use('/jobs', jobsRouter)

//server
const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3000',
  }
});

io.on("connection", (socket)=>{
  console.log(`user connected: ${socket.id}`);
  
  socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
    //get room's chat
    Msg.find({room: data}).then((result)=>{
      socket.emit('output-messages', result)
    });
  })
  socket.on("send_message",(data)=>{
    const message = new Msg({
      room: data.room,
      author: data.author,
      message: data.message,
      time: data.time,
    })
    message.save().then(()=>{
      socket.to(data.room).emit("receive_message",data);
    })
  })
  socket.on("disconnect", ()=>{
    console.log(`user disconnected: ${socket.id}`)
  })
});

server.listen(PORT,()=>{
  console.log(`server running on ${PORT}`);
});
