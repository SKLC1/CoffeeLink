import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { Card } from "../../../StyledComponents/Card.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
import RenderCVimg from "./renderCVimg";


function CVcard({cvObj, jobID}) {
  const {cv, applicantID} = cvObj;
  const {job} = useParams()
  const [preferences, setPreferences] = useState([])
  const [isImageShown, setIsImageShown] = useState(false) 
  
  useEffect(()=>{
    getJob()
  },[])
  async function getJob(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    setPreferences(data.preferences)
  }

  const onSwipe = (direction) => {
    if(direction === 'right'){
      createMatch(applicantID)
    } else if(direction === 'down'){
      setIsImageShown(!isImageShown)
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
    const preferences = ['name','education','experience','skills','languages']
    return preferencesArray.map(category=>{
       return(
        <div key={category} >
          <JustFlexRow>
          <p>{category !== 'name' &&`${category}:`}</p> 
          <p>{cv[category]}</p> 
          </JustFlexRow>
        </div>
       )
    })
  }

  console.log(isImageShown);
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
            {cv.imgURL && !isImageShown && <div>Swipe Down To See Project</div>}
        </Card>
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;


 