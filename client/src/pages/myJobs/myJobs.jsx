import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import HRjobCard from "../../components/HRjobCard/HRjobCard";
import { UserContext } from "../../UserContext";
import { Link, useParams } from 'react-router-dom';
import { ListItem } from "@mui/material";
import { Item } from "../../StyledComponents/Item.style";
import { JustFlexColumn } from "../../StyledComponents/JustFlexRow";
import { baseUrl } from "../../components/resuableComponents/baseURL";



function MyJobs() {
  const {currentUser, setCurrentUser, setNotifications} = useContext(UserContext)
  const [userJobs, setUserJobs] = useState([])
  const { id } = useParams();


  useEffect(()=>{
    getUpdatedCurrentUser()
    setNotifications([])
  },[])

  async function getUpdatedCurrentUser(){
    try {
    const getOneUrl = `${baseUrl}/hr_users/${id}`;
    const {data} = await axios.get(getOneUrl);
    setUserJobs(data.posted_jobs)
    } catch (error) {
      console.log(error);
    }
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
    <JustFlexColumn>
     <Link to='/post_job'>
     <Item>
      <h2>
      Post Job
      </h2>
      <h4>Post a position for everyone to apply</h4>
      {/* <img src="https://static.vecteezy.com/system/resources/previews/000/582/563/non_2x/button-plus-icon-vector.jpg"></img> */}
     </Item>
      </Link>
      <h2>OR</h2>
     <div>{renderPostedJobs()}</div>
    </JustFlexColumn>
    </>
   );
}

export default MyJobs;