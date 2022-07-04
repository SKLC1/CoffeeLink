import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true , unique: true},
  userType: {type: String, required: true, default: 'worker', immutable: true },
  cv: {type: Object},
  matches: [Object],
  applied: [Object],
})

export const User = mongoose.model('users', userScheme)

userScheme.pre('save',async function(next) {
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
  } catch(e){
    console.log(e);
    next()
  }
})
// hash password
userScheme.methods.comparePassword = async function (password) {
  if(!password) throw new Error('no password')
  try{
   const result = await bcrypt.compare(password, this.password)
   return result;
  } catch (err) {
   console.log(err);
  }
}

export default mongoose.model('user', userScheme)