import axios from "axios"
import { useState } from "react"
import ToggleUserType from "../resuableComponents/toggleUserType/toggleUserType.jsx"

function WelcomePage(){
  const [type, setType] = useState('worker')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  function handleSetUserType(input){
    setType(input)
  } 

  function handleLogin(){
    const loginURL = type === 'hr'?'http://localhost:5000/hr_users/login':'http://localhost:5000/users/login';
    const {data} = axios.post(loginURL,{
      userType: type,
      email: loginEmail,
      password: loginPassword,
    });
    console.log(data);
  }
  
  return(
    <>
    <div>welcome to CoffeeLink!</div>
      <ToggleUserType handleSetUserType={handleSetUserType}/>
      <p>login</p>
      <label>Email</label>
      <input></input>
      <label>Password</label>
      <input></input>
      <button onClick={()=>handleLogin()}>Login</button>
      <p>Dont have an account? SignUp</p>
    </>
  )
}
export default WelcomePage