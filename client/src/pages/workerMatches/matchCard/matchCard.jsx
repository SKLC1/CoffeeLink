import { useState } from "react";

function MatchCard({match, currentUser, socket}) {
  const [room, setRoom] = useState("")
    
  function handleJoinRoom(){
    setRoom(`${currentUser.loggedUser.first+match._id}`)
    if(currentUser){
      socket.emit("join_room", room);
    }
    
  }

  return ( 
    <>
      <div>
        <p>You have a match with {match.company}'s position for {match.role_title}</p>
        <button onClick={handleJoinRoom}>Schedule meeting</button>
      </div>
    </>
   );
}

export default MatchCard;