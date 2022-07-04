import axios from "axios"
import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import ToggleUserType from "../resuableComponents/toggleUserType/toggleUserType.jsx"

function WelcomePage(){
  const [type, setType] = useState('worker');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  function handleSetUserType(input){
    setType(input)
  } 

  async function handleLogin(){
    const loginURL = type === 'hr'?'http://localhost:5000/hr_users/login':'http://localhost:5000/users/login';
    const {data} = await axios.post(loginURL,{
      userType: type,
      email: loginEmail,
      password: loginPassword,
    });
    if(data.accessToken){
      setCurrentUser(data)
      if(data.loggedUser.userType === 'worker'){
        navigate('/')
      } else if (data.loggedUser.userType === 'hr'){
        navigate('/recruiter_profile')
      }
    } 
  }
  
  if(currentUser){
    return(
      <div>
        <button>Logout</button>
      </div>
    )
  } else {
    return(
      <>
    <div>welcome to CoffeeLink!</div>
      <ToggleUserType handleSetUserType={handleSetUserType}/>
      <p>login</p>
      <label>Email</label>
      <input onChange={(e)=>setLoginEmail(e.target.value)}></input>
      <label>Password</label>
      <input onChange={(e)=>setLoginPassword(e.target.value)}></input>
      <button onClick={()=>handleLogin()}>Login</button>
      <p>Don't have an account? SignUp</p>
    </>
    )
  }
}
export default WelcomePage