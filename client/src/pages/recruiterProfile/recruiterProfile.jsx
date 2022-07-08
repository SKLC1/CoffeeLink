
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";


function RecruiterProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  return ( 
    <>
     <div>profile pic</div>
     <div><Link to={`/myjobs${currentUser && currentUser.loggedUser._id}`}>Posted Jobs</Link></div>
    </>
   );
}

export default RecruiterProfile;