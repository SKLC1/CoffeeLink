
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form.style";
import { InputAndLabel } from "../../../StyledComponents/InputAndLabel.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
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
       <h2>welcome to CoffeeLink!</h2>
       <ToggleUserType handleSetUserType={handleSetUserType}/>
       <h2>login</h2>
       <JustFlexRow>
        <InputAndLabel>
        <label>Email:</label>
        <input onChange={(e)=>setLoginEmail(e.target.value)}></input>
        </InputAndLabel>
       </JustFlexRow>
       <JustFlexRow>
        <InputAndLabel>
        <label>Password:</label>
        <input onChange={(e)=>setLoginPassword(e.target.value)}></input>
        </InputAndLabel>
       </JustFlexRow>
       <JustFlexRow>
        <Button onClick={()=>handleLogin()}>Login</Button>
       </JustFlexRow>
       <p>Don't have an account? <Link to='/signup'><h4>Sign Up</h4></Link></p>
       </Form>
      </>
     )
}

export default Login;