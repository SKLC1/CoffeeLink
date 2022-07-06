import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function WorkerProfile() {
  const {currentUser} = useContext(UserContext)

  return ( 
    <>
      <div>profile page</div>
      <div>{currentUser.loggedUser.first}</div>
      <Link to={'/cv_upload'}><div>Upload your CV</div></Link>
      <Link to={'/my_matches'}><div>My Matches</div></Link>
    </>
   );
}

export default WorkerProfile;