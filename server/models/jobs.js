import mongoose from "mongoose";

const jobScheme = new mongoose.Schema({
  company: {type: Object, required: true},
  role_title: {type: String, required: true},
  job_description: {type: String, required: true},
  posted_by: {type: String},
  applicants: [Object],
  approved: [Object],
})

export const Job = mongoose.model('jobs', jobScheme)