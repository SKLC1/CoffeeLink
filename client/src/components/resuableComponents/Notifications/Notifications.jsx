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
  const {currentUser ,notifications} = useContext(UserContext)

  useEffect(()=>{
      renderNotificationCount()
  },[notifications])
  
  function renderNotificationCount(){
    if(notifications.length > 0 && notifications.length < 10){
      return <div className="notifications-counter">{notifications.length}</div>
    } else if(notifications.length > 10){
      return <div className="notifications-counter">+9</div>
    } else  if(notifications.length <= 0){
      return null
    }
    console.log(notifications.length);
  }
  return ( 
    <>
    <Link to={currentUser && currentUser.loggedUser.userType === 'worker'
    ?'/my_matches'
    :`/myJobs${currentUser && currentUser.loggedUser._id}`}>
      <NavButton>
          {renderNotificationCount()}
      <NotificationsIcon/>
      </NavButton>
    </Link>
    </>
   );
}

export default Notifications;