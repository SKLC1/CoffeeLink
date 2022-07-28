import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../StyledComponents/Button.style";
import { ProfilePage } from "../../StyledComponents/ProfilePage.style";
import { UserContext } from "../../UserContext";

function WorkerProfile() {
  const {currentUser} = useContext(UserContext)

  return ( 
    <>
     <ProfilePage>
      <h3>{`${currentUser && currentUser.loggedUser.first}'s profile page`} </h3>
      <br/>
      <Link to={'/cv_upload'}>
        <Button>
        <div>Upload your CV</div>
        </Button>
      </Link>
      <h2>
        OR
      </h2>
      <Link to={'/cv_generate'}>
        <Button>
        <div>Generate CV from LinkedIn</div>
        </Button>
      </Link>
      <Link to={'/my_matches'}>
        <Button>
        <div>My Matches</div>
        </Button>
      </Link>
     </ProfilePage>
    </>
   );
}

export default WorkerProfile;