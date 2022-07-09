import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import './CVcard.css'


function CVcard({cvObj, jobID}) {
  const {cv, applicantID} = cvObj;
  const {job} = useParams()
  const [preferences, setPreferences] = useState([])
  
  useEffect(()=>{
    getJob()
  },[])
  async function getJob(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    setPreferences(data.preferences)
  }

  const onSwipe = (direction) => {
    if(direction == 'right'){
      createMatch(applicantID)
    } else {
      console.log('left');
      // will need to save so we can not show this card to user again
    }
  }
  
  async function createMatch(ID){
    const url = `http://localhost:5000/users/addMatch/${ID}`
    const {data} = await axios.patch(url,{
      match: jobID,
    })
    console.log(data);
    if(data.cv){
      addToJobApproved()
    }
  }

  async function addToJobApproved(){
    const {data} = await axios.patch(`http://localhost:5000/jobs/`,{
      idOfJob: job,
      action: 'addApproved',
      idOfApprovedApplicant: applicantID,
    })
    console.log(data);
  }

  function renderCVbyPreferences(cv, preferencesArray){
    console.log(cv);
    const preferences = ['name','education','experience','skills','languages']
    return preferencesArray.map(category=>{
       return(
        <div key={category} >{cv[category]}</div>
       )
    })
  }

  return ( 
    <>
     <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
      <div className='job-card'>
       {renderCVbyPreferences(cv, preferences)}
      </div>
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;



// <div className='card-container'>
// <TinderCard 
// className='swipe'
// onSwipe={onSwipe}
// preventSwipe={['up','down']}>
//   <div className='job-card'>
//    <div>{cv.name}</div>
//    <div>{cv.education}</div>
//    <div>{cv.experience}</div>
//   </div>
// </TinderCard>
//   </div>