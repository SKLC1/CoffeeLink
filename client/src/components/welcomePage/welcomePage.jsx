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
  const navigate = useNavigate()
  //context
  const {currentUser, setCurrentUser} = useContext(UserContext)

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
      window.localStorage.setItem('CURRENT_USER', JSON.stringify(data))
      if(data.loggedUser.userType === 'worker'){
        navigate('/')
      } else if (data.loggedUser.userType === 'hr'){
        navigate('/recruiter_profile')
      }
    } 
  }

  function Login(){
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
  function Logout(){
    return(
      <button>Logout</button>
    )
  }
  return(
    <>
     { currentUser?<Logout/>:<Login/>}
    </> 
  )
}
export default WelcomePage