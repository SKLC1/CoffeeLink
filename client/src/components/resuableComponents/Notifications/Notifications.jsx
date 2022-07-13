import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavButton } from "../../../StyledComponents/Navbar.style";
import './Notifications.css'

function Notifications() {
  const {notifications} = useContext(UserContext)
  
  return ( 
    <>
    <Link to='/my_matches'>
      <NavButton>
        <div className="notifications-counter">
         {notifications}
        </div>
      <NotificationsIcon/>
      </NavButton>
    </Link>
    </>
   );
}

export default Notifications;