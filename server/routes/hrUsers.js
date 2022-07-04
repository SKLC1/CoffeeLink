import express from 'express'
import { HRuser } from '../models/hrUsers.js'
import bcrypt from 'bcrypt'
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
  try {
    const users = await HRuser.findById(req.params.id)
    res.json(users)
  } catch (error) {
    res.json({message: error.message})
  }
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
hrUsersRouter.patch('/:id', async (req,res)=>{
  const user = await getSpecific(req.params.id);
  if(req.body.prop !== null){
    console.log(user[req.body.prop]);
    user[req.body.prop] = req.body.value
  }
  try {
    const updated = await user.save()
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})
//delete one
hrUsersRouter.delete('/:id', async (req,res)=>{
  try{
    const user = await getSpecific(req.params.id);
    await user.remove()
    res.status(200).json('deleted successfully')
   } catch (error) {
    res.status(500).json({message: error.message})
   }
})

hrUsersRouter.post('/login',async(req,res)=>{
  const pass = (req.body.password)
  const users = await HRuser.findOne({email: req.body.email})
  if(users == null){
    return res.status(400).send('Invalid Email or Password.')
  }
  console.log(users[0].password);
  console.log(pass);
  const validPassword = await bcrypt.compare(pass, users[0].password);
  try {
    if (!validPassword){
      return res.status(400).send('Invalid Email or Password.')
    } else {
      res.status(200).json(users).send(`logged in as ${users[0].name}`)
    }
} catch (error) {
    console.log(error);
  }
})

async function getSpecific(id,req,res,next){
  const user = await HRuser.findById(id)
  try {  
    if(user == null){
      return res.status(404).json({ message: 'user not found' })
    } else {
      return user
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}