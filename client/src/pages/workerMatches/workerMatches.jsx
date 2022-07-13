import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { renderMatches } from "react-router-dom";
import { JustFlexRow } from "../../StyledComponents/JustFlexRow";
import { Title } from "../../StyledComponents/Title.style";
import { UserContext } from "../../UserContext";
import MatchCard from "./matchCard/matchCard";


function WorkerMatches({socket, currentUser}){
  const [jobMatches, setJobMatches] = useState([])
  const {setNotifications} = useContext(UserContext)

  useEffect(()=>{
    getAllMatches()
    setNotifications([])
  },[])
  
  async function getAllMatches(){
    const {data} = await axios.get(`http://localhost:5000/users/${currentUser && currentUser.loggedUser._id}`);
    const matches = data.matches;
    getMatchesCards(matches)
  }
  
  async function getMatchesCards(matches){
    const all = matches.map(id=>{
      return axios.get(`http://localhost:5000/jobs/${id}`)
    })
    const res = await Promise.all(all);
    const jobMatches = res.map(match=>{ return match.data})
    console.log(jobMatches);
    setJobMatches(jobMatches)
  }

  function renderMatches(){
    return jobMatches.map(match=>{
      return(
        <div key={match._id}>
          <MatchCard match={match} currentUser={currentUser} socket={socket}/>
        </div>
      )
    })
  }
  
  return ( 
    <>
      <JustFlexRow>
       <Title><h4>My Matches</h4></Title>
      </JustFlexRow>
      {renderMatches()}
    </>
  );
}

export default WorkerMatches;