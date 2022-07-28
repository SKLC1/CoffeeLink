import { useContext } from "react";
import { Button } from "../../StyledComponents/Button.style.jsx";
import { Form } from "../../StyledComponents/Form.style.jsx";
import { JustFlexColumn } from "../../StyledComponents/JustFlexRow.jsx";
import { UserContext } from "../../UserContext.js";
import Login from "./login/Login.jsx";

function WelcomePage({socket}){
  //context
  const {currentUser, setCurrentUser} = useContext(UserContext)

  
  function handleLogout(){
    setCurrentUser(null)
    window.localStorage.setItem('CURRENT_USER', JSON.stringify(null))
  }

  function Logout(){
    return(
      <JustFlexColumn>
        <Form>
         <h1>See You Soon</h1>
         <h3>:)</h3>
        <Button onClick={()=>handleLogout()}>Logout</Button>
        </Form>
      </JustFlexColumn>
    )
  }
  return(
    <>
     { currentUser?<Logout/>: <Login socket={socket} setCurrentUser={setCurrentUser}/>}
    </> 
  )
}
export default WelcomePage