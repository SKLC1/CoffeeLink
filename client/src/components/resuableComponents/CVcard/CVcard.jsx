import axios from "axios";
import TinderCard from "react-tinder-card";
import './CVcard.css'


function CVcard({cvObj, jobID}) {
  const {cv, applicantID} = cvObj;

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
    console.log(ID);
    const {data} = await axios.patch(url,{
      match: jobID,
    })
    console.log(data);
  }
  return ( 
    <>
     <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
      <div className='job-card'>
       <div>{cv.name}</div>
       <div>{cv.education}</div>
       <div>{cv.experience}</div>
      </div>
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;