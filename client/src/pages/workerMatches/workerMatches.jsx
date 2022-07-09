import axios from "axios";
import { useEffect, useState } from "react";
import { renderMatches } from "react-router-dom";
import MatchCard from "./matchCard/matchCard";


function WorkerMatches({socket, currentUser}){
  const [jobMatches, setJobMatches] = useState([])

  useEffect(()=>{
    getAllMatches()
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
      <div>matches page</div>
      {renderMatches()}
    </>
  );
}

export default WorkerMatches;