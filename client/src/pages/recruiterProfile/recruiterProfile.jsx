
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../StyledComponents/Button.style";
import { Form } from "../../StyledComponents/Form.style";
import { JustFlexColumn } from "../../StyledComponents/JustFlexRow";
import { UserContext } from "../../UserContext";

function RecruiterProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  return ( 
    <>
    <JustFlexColumn>
     <div>
      <Form>
        <div>
          <img src="https://cdn.dribbble.com/users/3135979/screenshots/6400121/new-6-01_4x.jpg?compress=1&resize=400x300&vertical=top"></img>
        </div>
      <Button width={'10rem'}>
       <Link to={`/myjobs${currentUser && currentUser.loggedUser._id}`}>Posted Jobs</Link>
      </Button>
      </Form>
      </div>
    </JustFlexColumn>
    </>
   );
}

export default RecruiterProfile;