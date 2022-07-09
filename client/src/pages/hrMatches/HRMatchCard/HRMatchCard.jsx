import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    <>
    <div>{`${applicant.first} ${applicant.last}`}</div>
    <button onClick={handleJoinRoom}>Schedule meeting</button>
    </>
   );
}

export default HRMatchCard;