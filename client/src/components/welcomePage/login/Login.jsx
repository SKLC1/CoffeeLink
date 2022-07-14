
import { TextField } from "@mui/material";
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form.style";
import LogoSvgV3 from "../../LogosComponenets/LogoSvgV3";
import ToggleUserType from "../../resuableComponents/toggleUserType/toggleUserType";

function Login({setCurrentUser}){
    const [type, setType] = useState('worker');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate()

    function handleSetUserType(input){
      console.log(input);
      setType(input)
    } 
  
    async function handleLogin(){
      const loginURL = (type === 'hr')?
      'http://localhost:5000/hr_users/login':
      'http://localhost:5000/users/login';
      const {data} = await axios.post(loginURL,{
        userType: type,
        email: loginEmail,
        password: loginPassword,
      });
      console.log(data);
      if(data.accessToken){
        setCurrentUser(data)
        // this should only be commented out on development
        window.localStorage.setItem('CURRENT_USER', JSON.stringify(data))
        if(data.loggedUser.userType === 'worker'){
          navigate('/')
        } else if (data.loggedUser.userType === 'hr'){
          navigate('/recruiter_profile')
        }
      } else {
        console.log('something went wrong');
      }
    }
    return(
      <>
       <Form>
       <h2>Login</h2>
       <ToggleUserType handleSetUserType={handleSetUserType}/>
        <TextField label="Email" onChange={(e)=>setLoginEmail(e.target.value)}></TextField>
        <TextField label="Password" onChange={(e)=>setLoginPassword(e.target.value)}></TextField>
        <Button onClick={()=>handleLogin()}>Login</Button>
       <p>Don't have an account? <Link to='/signup'><h4>Sign Up</h4></Link></p>
       </Form>
      </>
     )
}

export default Login;