import express from 'express'
import { User } from '../models/users.js'
export const usersRouter = express.Router()

//get all
usersRouter.get('/', async (req,res)=>{
  try {
    const users = await User.find()
  } catch (error) {
    
  }
})
//get one
usersRouter.get('/:id',(req,res)=>{
  res.send(req.params.id)
})
//add one
usersRouter.post('/',(req,res)=>{
  res.send('ok')
})
//update one
usersRouter.patch('/:id',(req,res)=>{
  res.send('ok')
})
//delete one
usersRouter.delete('/:id',(req,res)=>{
  res.send('ok')
})