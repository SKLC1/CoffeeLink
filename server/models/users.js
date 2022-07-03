import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  userType: {type: String, required: true},
  cv: {},
  matches: [String],
})

export const User = mongoose.model('users', userScheme)