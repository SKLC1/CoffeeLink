import { useState } from "react";
import { useParams } from "react-router-dom";


function HRMatchCard({applicant, socket, currentUser}) {
  const [room, setRoom] = useState("")
  const {job} = useParams()
  

  function handleJoinRoom(){
    setRoom(`${applicant.first+job}`)
    if(currentUser){
      socket.emit("join_room", room);
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