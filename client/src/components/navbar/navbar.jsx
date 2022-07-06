import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link} from "react-router-dom"


function Navbar(){
  const {currentUser, setCurrentUser} = useContext(UserContext);

  
  return(
    <>
    <div>im Navbar</div>
    <Link to={(currentUser && (currentUser.loggedUser.userType === 'worker')?'/profile':'/recruiter_profile')}>
      {currentUser && `logged in as ${currentUser.loggedUser.first}`}
    </Link>
    <Link to='login'>logout</Link>
    </>
  )
}
export default Navbar