
import { TextField } from "@mui/material";
import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Form } from "../../../StyledComponents/Form.style";
import { InputAndLabel } from "../../../StyledComponents/InputAndLabel.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
import LogoSvgV3 from "../../LogosComponenets/LogoSvgV3";
import { baseUrl } from "../../resuableComponents/baseURL";
import ToggleUserType from "../../resuableComponents/toggleUserType/toggleUserType";

function Login({setCurrentUser, socket}){
    const [type, setType] = useState('worker');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate()

    function handleSetUserType(input){
      setType(input)
    }
    

    async function handleLogin(){
      const loginURL = (type === 'hr')?
      `${baseUrl}hr_users/login`:
      `${baseUrl}users/login`;
      try{

        const {data} = await axios.post(loginURL,{
          userType: type,
          email: loginEmail,
          password: loginPassword,
        });
        console.log(data);
        if(data.accessToken){
          setCurrentUser(data)
          // this should only be commented out on development
          // window.localStorage.setItem('CURRENT_USER', JSON.stringify(data))
          if(data.loggedUser.userType === 'worker'){
            connectToRooms(data.loggedUser.rooms, socket)
            navigate('/')
          } else if (data.loggedUser.userType === 'hr'){
            navigate('/recruiter_profile')
          }
        } else {
          console.log('something went wrong');
        }
      } catch(e){
        console.log(e);
      }
    }
    
    function connectToRooms(rooms,socket){
      rooms.forEach(async (room)=>{
        const res = await socket.emit("join_room", room);
        console.log(res);
      })
    }
    return(
      <>
       <Form>
       <h2>Login</h2>
       <ToggleUserType handleSetUserType={handleSetUserType}/>
        <TextField margin="normal" label="Email" onChange={(e)=>setLoginEmail(e.target.value)}></TextField>
        <TextField margin="normal" label="Password" onChange={(e)=>setLoginPassword(e.target.value)}></TextField>
        <Button onClick={()=>handleLogin()}>Login</Button>
       <p>Don't have an account? <Link to='/signup'>
       <JustFlexRow>
        <Button>Sign Up</Button>
       </JustFlexRow>
        </Link>
        </p>
       </Form>
      </>
     )
}

export default Login;