import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  userType: String,
  cv: {},
  matches: []
})

export const User = mongoose.model('User', userScheme)