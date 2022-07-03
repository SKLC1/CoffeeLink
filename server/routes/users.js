import express from 'express'
import { User } from '../models/users.js'
export const usersRouter = express.Router()

//get all
usersRouter.get('/', async (req,res)=>{
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.json({message: error.message})
  }
})
//get one
usersRouter.get('/:id', async (req,res)=>{
  res.send(req.params.id)
})
//add one
usersRouter.post('/', async (req,res)=>{
  const bodyTest = req.body
  console.log(req.body);
  try {
  const newUser = new User({
    first: req.body.first,
    last: req.body.last,
    password: req.body.password,
    email: req.body.email,
    userType: req.body.userType,
  })
  await newUser.save()
  res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})
//update one
usersRouter.patch('/:id',(req,res)=>{
  res.send('ok')
})
//delete one
usersRouter.delete('/:id',(req,res)=>{
  res.send('ok')
})