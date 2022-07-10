import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link} from "react-router-dom"
import Notifications from "../resuableComponents/Notifications/Notifications";
import {NavbarComponent, NavbarLinks} from'../../StyledComponents/Navbar.style.jsx'
import LogoSvgV1 from "../LogosComponenets/LogoSvgV1";

function Navbar({currentUser}){

  return(
    <>
    <NavbarComponent backgroundColor={'hsl(341,93%,57%)'}>
     <div>
       <LogoSvgV1 width={'100px'} height={'100px'} fill={'#fff'}/>
     </div>
     <NavbarLinks>
       <Link to={(currentUser && (currentUser.loggedUser.userType === 'worker')?'/profile':'/recruiter_profile')}>
        {currentUser && `logged in as ${currentUser.loggedUser.first}`}
       </Link>
       <Link to='/login'>logout</Link>
       <Link to='/'>Explore</Link>
       <Notifications/>
     </NavbarLinks>
    </NavbarComponent>
    </>
  )
}
export default Navbar