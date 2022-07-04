import { useContext } from "react"
import { UserContext } from "../../UserContext"


function Navbar(){
  const {currentUser, setCurrentUser} = useContext(UserContext)

  return(
    <>
    <div>{currentUser && currentUser.first}</div>
    <div>im Navbar</div>
    </>
  )
}
export default Navbar