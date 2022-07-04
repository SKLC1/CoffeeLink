import { useContext } from "react"
import { UserContext } from "../../UserContext"


function Navbar(){
  const {currentUser, setCurrentUser} = useContext(UserContext)

  return(
    <>
    <div>im Navbar</div>
    <div>{currentUser && `logged in as ${currentUser.loggedUser.first}`}</div>
    </>
  )
}
export default Navbar