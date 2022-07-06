import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import Login from "./login/Login.jsx";

function WelcomePage(){
  //context
  const {currentUser, setCurrentUser} = useContext(UserContext)

  
  function handleLogout(){
    setCurrentUser(null)
    window.localStorage.setItem('CURRENT_USER', JSON.stringify(null))
  }

  function Logout(){
    return(
      <button onClick={()=>handleLogout()}>Logout</button>
    )
  }
  return(
    <>
     { currentUser?<Logout/>: <Login setCurrentUser={setCurrentUser}/>}
    </> 
  )
}
export default WelcomePage