import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { Card } from "../../../StyledComponents/Card.style";
import RenderCVimg from "./renderCVimg";


function CVcard({cvObj, jobID}) {
  const {cv, applicantID} = cvObj;
  const {job} = useParams()
  const [preferences, setPreferences] = useState([])
  const [isImageShown, setIsImageShown] = useState(true) 
  
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
        <div key={category} >
          {cv[category]}
        </div>
       )
    })
  }

  function toggleImage(){
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(isImageShown);
    setIsImageShown(!isImageShown)
  }
  
  return ( 
    <>
     <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
        <Card backgroundColor={'#fff'}>
          <div>
            {renderCVbyPreferences(cv, preferences)}
          </div>
          <div>
            {isImageShown && cv.imgURL?<RenderCVimg imgURL={cv.imgURL} link={cv.imgLinkTo}/>:null}
          </div>
        </Card>
          {/* {cv.imgURL && <button onClick={toggleImage}> UP ARROW</button>} */}
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;


 