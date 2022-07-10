import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form";
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
      const {data} = await axios.post(`http://localhost:5000/${type == 'hr'?'hr_users':'users'}`,{
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
        <h3>First Name: <input name="first" type='text' onChange={handleChange}/></h3>
        <h3>Last Name: <input name="last" type='text' onChange={handleChange}/></h3>
        <h3>Email: <input name="email" type='email' onChange={handleChange}/></h3>
        <h3>Password: <input name="password" type='text' onChange={handleChange}/></h3>
        { type == 'hr' && <h3>Company: <input name="company" type='text' onChange={handleChange}/></h3>}
        <Button type="submit">Sign Up</Button>
      </form>
      </Form>
    </div>
   );
}

export default SignUp;