
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../StyledComponents/Button.style";
import { JustFlexColumn } from "../../StyledComponents/JustFlexRow";
import { UserContext } from "../../UserContext";


function RecruiterProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  return ( 
    <>
    <JustFlexColumn>
     <div>
      <Button width={'10rem'}>
       <Link to={`/myjobs${currentUser && currentUser.loggedUser._id}`}>Posted Jobs</Link>
      </Button>
      </div>
    </JustFlexColumn>
    </>
   );
}

export default RecruiterProfile;