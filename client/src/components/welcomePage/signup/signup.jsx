import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form.style";
import { InputAndLabel } from "../../../StyledComponents/InputAndLabel.style";
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
      const {data} = await axios.post(`https://coffee--link.herokuapp.com/${type == 'hr'?'hr_users':'users'}`,{
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
        <h4>First Name: </h4><input name="first" type='text' onChange={handleChange}/>
        </InputAndLabel>
        <InputAndLabel>
        <h4>Last Name: </h4><input name="last" type='text' onChange={handleChange}/>
        </InputAndLabel>
        <InputAndLabel>
        <h4>Email:</h4> <input name="email" type='email' onChange={handleChange}/>
        </InputAndLabel>
        <InputAndLabel>
        <h4>Password: </h4><input name="password" type='text' onChange={handleChange}/>
        </InputAndLabel>
        { type == 'hr' && <h3>Company: <input name="company" type='text' onChange={handleChange}/></h3>}
        <Button type="submit">Sign Up</Button>
      </form>
      </Form>
    </div>
   );
}

export default SignUp;