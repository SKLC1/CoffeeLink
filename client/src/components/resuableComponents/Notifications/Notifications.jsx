import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavButton } from "../../../StyledComponents/Navbar.style";

function Notifications() {
  const [curMatches, setCurMatches] = useState(0)
  const {currentUser} = useContext(UserContext)
  
  return ( 
    <>
    <Link to='/my_matches'>
      <NavButton>
      <NotificationsIcon/>
      </NavButton>
    </Link>
    </>
   );
}

export default Notifications;