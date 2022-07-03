import express from 'express'
import mongoose from 'mongoose'

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('')


app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`);
})