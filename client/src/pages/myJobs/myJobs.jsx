import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import HRjobCard from "../../components/HRjobCard/HRjobCard";
import { UserContext } from "../../UserContext";
import { Link, useParams } from 'react-router-dom';


function MyJobs() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [userJobs, setUserJobs] = useState([])
  const { id } = useParams();


  useEffect(()=>{
    getUpdatedCurrentUser()
  },[])

  async function getUpdatedCurrentUser(){
    const getOneUrl = `http://localhost:5000/hr_users/${id}`;
    const {data} = await axios.get(getOneUrl);
    console.log(data);
    setUserJobs(data.posted_jobs)
  }

  function renderPostedJobs(){
    if(userJobs.length > 0){
      return userJobs.map(job=>{
        console.log(job.job);
        return(
          <div key={job.job_description}>
            <HRjobCard job={job.job} />
          </div>
        )
    })
    } else {
      return(
        <div>
          <p>You haven't Posted any Jobs yet</p>
        </div>
      )
    }
  }
  
  return ( 
    <>
     <div>{renderPostedJobs()}</div>
     <div className="hr-job-card"><Link to='/post_job'>Post Job</Link></div>
    </>
   );
}

export default MyJobs;