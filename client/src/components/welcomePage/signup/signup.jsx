import axios from "axios"
import { useState } from "react";
import ToggleUserType from "../../resuableComponents/toggleUserType/toggleUserType";

function SignUp() {
  const [type, setType] = useState('worker');
  const [signupInfo, setSignupInfo] = useState({
    first:"",
    last:"",
    email:"",
    password:'',
    company:'',
    userType: type,
  })
  function handleSetUserType(input){
    console.log(input);
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
    const {data} = await axios.patch('',{signupInfo})
    console.log(data);
  }

  return ( 
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <ToggleUserType handleSetUserType={handleSetUserType}/>
        <h3>First Name: <input name="first" type='text' onChange={handleChange}/></h3>
        <h3>Last Name: <input name="last" type='text' onChange={handleChange}/></h3>
        <h3>Email: <input name="email" type='email' onChange={handleChange}/></h3>
        <h3>Password: <input name="password" type='text' onChange={handleChange}/></h3>
        { type == 'hr' && <h3>Company: <input name="company" type='text' onChange={handleChange}/></h3>}
        <button  type="submit">Sign Up</button>
      </form>
    </div>
   );
}

export default SignUp;