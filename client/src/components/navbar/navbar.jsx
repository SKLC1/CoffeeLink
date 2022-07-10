import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link} from "react-router-dom"
import Notifications from "../resuableComponents/Notifications/Notifications";


function Navbar({currentUser}){

  return(
    <>
    <div>im Navbar</div>
    <Link to={(currentUser && (currentUser.loggedUser.userType === 'worker')?'/profile':'/recruiter_profile')}>
      {currentUser && `logged in as ${currentUser.loggedUser.first}`}
    </Link>
    <Link to='/'>Explore</Link>
    <Link to='/login'>logout</Link>
    <Notifications/>
    </>
  )
}
export default Navbar