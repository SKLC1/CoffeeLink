import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { renderMatches } from "react-router-dom";
import { baseUrl } from "../../components/resuableComponents/baseURL";
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
    try {
    const {data} = await axios.get(`${baseUrl}/users/${currentUser && currentUser.loggedUser._id}`);
    const matches = data.matches;
    getMatchesCards(matches)
    
   } catch (error) {
    console.log(error);
   }
  }
  
  async function getMatchesCards(matches){
    try {
    const all = matches.map(id=>{
      return axios.get(`${baseUrl}/jobs/${id}`)
    })
    const res = await Promise.all(all);
    const jobMatches = res.map(match=>{ return match.data})
    console.log(jobMatches);
    setJobMatches(jobMatches)
      
    } catch (error) {
      console.log(error);
    }
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