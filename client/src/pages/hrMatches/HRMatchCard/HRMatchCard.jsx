import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Item } from "../../../StyledComponents/Item.style";
import { JustFlexColumn } from "../../../StyledComponents/JustFlexRow";
import Chat from "../../Chat/Chat";


function HRMatchCard({applicant, socket, currentUser}) {
  const [room, setRoom] = useState("")
  const {job} = useParams()
  const navigate = useNavigate()

  function handleJoinRoom(){
    setRoom(`${applicant.first+job}`)
    if(currentUser){
      socket.emit("join_room", applicant.first+job);
      navigate(`/chat${applicant.first+job}`)
    }
  } 
  
  return ( 
    <Item>
      <JustFlexColumn>
        <h2>{`${applicant.first} ${applicant.last}`}</h2>
        <Button onClick={handleJoinRoom}>Schedule meeting</Button>
      </JustFlexColumn>
    </Item>
   );
}

export default HRMatchCard;