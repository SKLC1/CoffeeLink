import axios from "axios";
import { useEffect, useState } from "react";
import { renderMatches, useParams } from "react-router-dom";
import HRMatchCard from "./HRMatchCard/HRMatchCard";


function HRMatches({socket, currentUser}) {
  const {job} = useParams()
  const [matches, setMatches] = useState([])
  
  useEffect(()=>{
    getMatches()
  },[])

  async function getMatches(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    console.log(data);
    if(data.approved){
      getAllApprovedApplicants(data.approved)
    }
  }

  async function getAllApprovedApplicants(approvedArray){
    const arrOfUsersReq = approvedArray.map(userID=>{ return axios.get(`http://localhost:5000/users/${userID}`)})
    const allUsers = await Promise.all(arrOfUsersReq)
    setMatches(allUsers)
  }

  function renderMatches(){
    return matches.map((applicantRes)=>{
      const { data } = applicantRes;
      return <HRMatchCard currentUser={currentUser} applicant={data} socket={socket} key={data._id}/>
    })
  }

  return ( 
    <>
     <div>The matches for this Job are:</div>
      {renderMatches()}
    </>
   );
}

export default HRMatches;