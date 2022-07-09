import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div>
        <p>You have a match with {match.company}'s position for {match.role_title}</p>
        <button onClick={handleJoinRoom}>Schedule meeting</button>
      </div>
    </>
   );
}

export default MatchCard;