import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Item } from "../../../StyledComponents/Item.style";
import { UserContext } from "../../../UserContext";

function MatchCard({match, socket}) {
  const [room, setRoom] = useState("")
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate() 

  console.log(currentUser);
  function handleJoinRoom(){
    setRoom(`${currentUser.loggedUser.first+match._id}`)
    if(currentUser){
      socket.emit("join_room", currentUser.loggedUser.first+match._id);
      navigate(`/chat${currentUser.loggedUser.first+match._id}`)
    }
  }

  return ( 
    <>
      <Item>
        <h4>You have a match with {match.company}'s position for {match.role_title}</h4>
        <Button onClick={handleJoinRoom}>Schedule meeting</Button>
      </Item>
    </>
   );
}

export default MatchCard;