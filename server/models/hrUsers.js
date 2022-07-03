import mongoose from "mongoose";

const hrUserScheme = new mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  userType: {type: String, required: true},
  matches: [String],
})

export const HRuser = mongoose.model('hr_users', hrUserScheme)