import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../StyledComponents/Button.style";
import { Item } from "../../../StyledComponents/Item.style";
import { JustFlexColumn } from "../../../StyledComponents/JustFlexRow";
import { UserContext } from "../../../UserContext";
import Chat from "../../Chat/Chat";


function HRMatchCard({applicant, socket}) {
  const [room, setRoom] = useState("")
  const {job} = useParams()
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)

  async function handleJoinRoom(){
    setRoom(`${applicant.first+job}`)
    const res = await socket.emit("join_room", applicant.first+job);
    console.log(res);
    navigate(`/chat${applicant.first+job}`)
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