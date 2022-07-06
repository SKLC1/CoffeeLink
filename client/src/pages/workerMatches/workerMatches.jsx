import axios from "axios";
import { useEffect } from "react";


function WorkerMatches({currentUser}){

  useEffect(()=>{
    getAllMatches()
  })

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
  }

  return ( 
    <>
      <div>matches page</div>
    </>
  );
}

export default WorkerMatches;