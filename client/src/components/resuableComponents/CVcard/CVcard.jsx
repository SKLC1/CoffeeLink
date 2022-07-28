import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { Card } from "../../../StyledComponents/Card.style";
import { CVCategory } from "../../../StyledComponents/CVcategory";
import { JustFlexRow, JustFlexRowCV } from "../../../StyledComponents/JustFlexRow";
import { baseUrl } from "../baseURL";
import RenderCVimg from "./renderCVimg";


function CVcard({cvObj, jobID, socket}) {
  const {job} = useParams()
  const [preferences, setPreferences] = useState([])
  const [isImageShown, setIsImageShown] = useState(false)
  const {cv, applicantID} = cvObj;
  

  useEffect(()=>{
    getJob()
  },[])
  
  async function getJob(){
    try { 
      const {data} = await axios.get(`${baseUrl}/jobs/${job}`)
      setPreferences(data.preferences)
    } catch (error) {
      console.log(error); 
    }
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
    try {
    const url = `${baseUrl}/users/addMatch/${ID}`
    const {data} = await axios.patch(url,{
      match: jobID,
    })
    console.log(data);
    if(data.cv){
      addToJobApproved()
    }
    } catch (error) {
      console.log(error); 
    }
  }

  async function addToJobApproved(){
    const {data} = await axios.patch(`${baseUrl}/jobs/`,{
      idOfJob: job,
      action: 'addApproved',
      idOfApprovedApplicant: applicantID,
    })
    console.log(data);
    sendMessageToUser(job,applicantID)
  }
  async function sendMessageToUser(jobID, applicantID){
    const {data} = await axios.get(`${baseUrl}/users/${applicantID}`)
    console.log(data);
    const userFirst = data.first;
    console.log(userFirst+jobID);
    const msgData = {
      room: userFirst+jobID,
      author: "Match Message",
      message: `Hey ${userFirst}, I liked your Dynamic CV! what would be an appropriate time to chat?`,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
    }
    socket.emit("send_message", msgData)
  }

  function renderCVbyPreferences(cv, preferencesArray){
    // const preferences = ['name','education','experience','skills','languages']
    return preferencesArray.map(category=>{
       return(
        <div key={category} >
          <CVCategory>
          <h4>{category !== 'name' &&`${category}: `}</h4> 
          {category === 'name'? <h2>{cv[category]}</h2>:<p>{cv[category]}</p>} 
          </CVCategory>
        </div>
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
        <Card 
         backgroundColor={'#fff'}
         nameColor={'hsl(212,99%,49%)'}
         categoryColor={'hsl(212,99%,49%)'}
         descriptionColor={''}
        >
          <div>
            {!isImageShown && renderCVbyPreferences(cv, preferences)}
          </div>
          <div> 
            {isImageShown && cv.imgURL?<RenderCVimg imgURL={cv.imgURL} link={cv.imgLinkTo}/>:null}
          </div>
          <div>
            {Object.values(cv).includes("imgURL") && !isImageShown && <div>Swipe Down To See Project</div>}
          </div>
        </Card>
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;


 