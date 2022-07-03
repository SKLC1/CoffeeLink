import express from 'express'
import { HRuser } from '../models/hrUsers.js'
export const hrUsersRouter = express.Router()

//get all
hrUsersRouter.get('/', async (req,res)=>{
  try {
    const users = await HRuser.find()
    res.json(users)
  } catch (error) {
    res.json({message: error.message})
  }
})
//get one
hrUsersRouter.get('/:id', async (req,res)=>{
  res.send(req.params.id)
})
//add one
hrUsersRouter.post('/', async (req,res)=>{
  const bodyTest = req.body
  console.log(req.body);
  try {
  const newUser = new HRuser({
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
hrUsersRouter.patch('/:id',(req,res)=>{
  res.send('ok')
})
//delete one
hrUsersRouter.delete('/:id',(req,res)=>{
  res.send('ok')
})