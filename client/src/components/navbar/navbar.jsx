import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link} from "react-router-dom"
import Notifications from "../resuableComponents/Notifications/Notifications"
import {NavbarComponent, NavbarLinks, NavButton} from'../../StyledComponents/Navbar.style.jsx'
import LogoSvgV1 from "../LogosComponenets/LogoSvgV1";
import LogoSvgV2 from "../LogosComponenets/LogoSvgV1";
import LogoSvgV3 from "../LogosComponenets/LogoSvgV3";

function Navbar({currentUser, socket}){

  return(
    <>
    <NavbarComponent backgroundColor={'#fff'}>
     <div>
       <LogoSvgV1 width={'130px'} height={'200px'} fill={'hsl(210,99%,50%)'}/>
     </div>
     {currentUser && currentUser !== null && <NavbarLinks>
       <Link to={(currentUser && (currentUser.loggedUser.userType === 'worker')?'/profile':'/recruiter_profile')}>
      <NavButton>
        <p>My Profile</p>
      </NavButton>
       </Link>
       <Link to='/login'>
        <NavButton>logout</NavButton>
       </Link>
         {currentUser && currentUser.loggedUser.userType !== 'hr' &&  
        <Link to='/'>
         <NavButton>
         Explore
         </NavButton>
       </Link>}
       <Notifications socket={socket}/>
     </NavbarLinks>}
    </NavbarComponent>
    </>
  )
}
export default Navbar