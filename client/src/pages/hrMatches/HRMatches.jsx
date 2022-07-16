import axios from "axios";
import { useEffect, useState } from "react";
import { renderMatches, useParams } from "react-router-dom";
import { baseUrl } from "../../components/resuableComponents/baseURL";
import { Title } from "../../StyledComponents/Title.style";
import HRMatchCard from "./HRMatchCard/HRMatchCard";


function HRMatches({socket, currentUser}) {
  const {job} = useParams()
  const [matches, setMatches] = useState([])
  
  useEffect(()=>{
    getMatches()
  },[])
 
  async function getMatches(){
    const {data} = await axios.get(`${baseUrl}/jobs/${job}`)
    console.log(data);
    if(data.approved){
      getAllApprovedApplicants(data.approved)
    }
  }

  async function getAllApprovedApplicants(approvedArray){
    const arrOfUsersReq = approvedArray.map(userID=>{ return axios.get(`${baseUrl}/users/${userID}`)})
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
     <Title>The matches for this Job are:</Title>
      {renderMatches()}
    </>
   );
}

export default HRMatches;