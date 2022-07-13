import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import HRjobCard from "../../components/HRjobCard/HRjobCard";
import { UserContext } from "../../UserContext";
import { Link, useParams } from 'react-router-dom';
import { ListItem } from "@mui/material";
import { Item } from "../../StyledComponents/Item.style";



function MyJobs() {
  const {currentUser, setCurrentUser, setNotifications} = useContext(UserContext)
  const [userJobs, setUserJobs] = useState([])
  const { id } = useParams();


  useEffect(()=>{
    getUpdatedCurrentUser()
    setNotifications([])
  },[])

  async function getUpdatedCurrentUser(){
    const getOneUrl = `http://localhost:5000/hr_users/${id}`;
    const {data} = await axios.get(getOneUrl);
    setUserJobs(data.posted_jobs)
  }

  function renderPostedJobs(){
    if(userJobs.length > 0){
      return userJobs.map(job=>{
        return(
          <div key={job.job.job_description}>
            <HRjobCard job={job.job} />
          </div>
        ) 
    })
    } else {
      return(
        <Item>
          <h4>You haven't Posted any Jobs yet</h4>
        </Item>
      )
    }
  }
  
  return ( 
    <>
     <div>{renderPostedJobs()}</div>
     <Link to='/post_job'>
     <Item>
      <h2>
      Post Job
      </h2>
      <img src="https://static.vecteezy.com/system/resources/previews/000/582/563/non_2x/button-plus-icon-vector.jpg"></img>
     </Item>
      </Link>
    </>
   );
}

export default MyJobs;