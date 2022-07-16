import { TextField } from "@mui/material";
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form.style";
import { InputAndLabel } from "../../../StyledComponents/InputAndLabel.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
import { baseUrl } from "../../resuableComponents/baseURL";
import ToggleUserType from "../../resuableComponents/toggleUserType/toggleUserType";

function SignUp() {
  const navigate = useNavigate()
  const [type, setType] = useState('');
  const [signupInfo, setSignupInfo] = useState({
    first:"",
    last:"",
    email:"",
    password:'',
    company:'',
  })
  function handleSetUserType(input){
    setType(input)
  } 

  function handleChange(e){
     const {name, value} = e.target;
     setSignupInfo((prev)=>{
      return {...prev, [name]: value}
    })
  }
  async function handleSubmit(e){
    e.preventDefault()
    try {
      const {first,last,email,password,userType,company} = signupInfo;
      const {data} = await axios.post(`${baseUrl}/${type == 'hr'?'hr_users':'users'}`,{
        first,last,email,password,company
      })
      if(!data.message){
        navigate('/login')
      } 
    } catch (error) {
      if(error){
        console.log('Sorry, This email Already Exists');
      } 
    }

  }

  return ( 
    <div>
      <Form>
      <h2>Sign up</h2>
      <ToggleUserType handleSetUserType={handleSetUserType}/>
      <form onSubmit={handleSubmit}>
        <InputAndLabel>
        <TextField label="First Name" name="first" type='text' onChange={handleChange}/>
        <TextField label="Last Name" name="last" type='text' onChange={handleChange}/>
        <TextField label="Email" name="email" type='email' onChange={handleChange}/>
        <TextField label="Password" name="password" type='text' onChange={handleChange}/>
        { type == 'hr' && <TextField label="Company" name="company" type='text' onChange={handleChange}/>}
        <JustFlexRow>
        <Button type="submit">Sign Up</Button>
        <Link to='/login'>
        <Button type="submit">Back to Login</Button>
        </Link>
        </JustFlexRow>
        </InputAndLabel>
      </form>
      </Form>
    </div>
   );
}

export default SignUp;