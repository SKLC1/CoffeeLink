import mongoose from "mongoose";

const jobScheme = new mongoose.Schema({
  company: {type: Object, required: true},
  role_title: {type: String, required: true},
  job_description: {type: String, required: true, unique: true},
  job_requirements: {type: String, required: true},
  location: {type: String, required: true},
  posted_by: {type: String},
  applicants: [Object],
  approved: [Object],
  preferences,
})
// ['name','education','experience','skills','languages']

export const Job = mongoose.model('jobs', jobScheme)