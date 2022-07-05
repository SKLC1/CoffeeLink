import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import HRjobCard from "../../components/HRjobCard/HRjobCard";
import { UserContext } from "../../UserContext";
import { useParams } from 'react-router-dom';


function MyJobs() {
  const {currentUser} = useContext(UserContext)
  const { id } = useParams();

  useEffect(()=>{
    getUpdatedCurrentUser()
  },[])

  async function getUpdatedCurrentUser(){
    const getOneUrl =  `http://localhost:5000/hr_users/${id.split(':')[1]}`;
    console.log(getOneUrl);
    const {data} = await axios.get(getOneUrl);
    console.log(data);
  }


  function renderPostedJobs(){
    if(currentUser.posted_jobs.length > 0){
      currentUser.posted_jobs.map(job=>{
        return(
          <><HRjobCard job={job}/></>
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
     <button>Post Job</button>
     {/* <div>{renderPostedJobs()}</div> */}
    </>
   );
}

export default MyJobs;