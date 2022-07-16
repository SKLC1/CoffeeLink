import axios from 'axios';
import TinderCard from 'react-tinder-card'
import { JustFlexRowCV } from '../../../StyledComponents/JustFlexRow';
import { Card } from '../../../StyledComponents/Card.style'
import './jobCard.css'
import { CVCategory } from '../../../StyledComponents/CVcategory';
import { JobCardCategory } from '../../../StyledComponents/JobCardCategory';
import { baseUrl } from '../baseURL';

// const URL = process.env?"heroku":"local";

function JobCard({card, currentUser}){
  
  const onSwipe = (direction) => {
    if(direction == 'right'){
      console.log("right");
      addUserToApplied()
    } else {
      console.log('left');
      // will need to save so we can not show this card to user again
    }
  }
  
  async function addUserToApplied(){
    const {loggedUser} = currentUser;
    const {data} = await axios.patch(`${baseUrl}/jobs`,{
      idOfJob: card._id,
      action: "addCV",
      cvObj: {
        applicantID: loggedUser._id,
        cv: loggedUser.cv
      }
    });
    console.log(data);
  }
  function renderJobCard(){
    const displayArr = ['company','role_title','job_description','job_requirements','location'];
    const cardArr = [];
    for (const [key, value] of Object.entries(card)) {
      if (displayArr.includes(key)){
        cardArr.push([key, value])
      }
    }
    return cardArr.map((categoryObj,idx)=>{
      const categoryNameArr = ['','Role Title','Description','Requirements','Location'];
      return(
       <JobCardCategory key={categoryObj[0]} >
          <h2>{categoryNameArr[idx]}</h2>
          {categoryObj[0] === 'company'?<h1>{categoryObj[1]}</h1>:<h4>{categoryObj[1]}</h4>}
       </JobCardCategory>
      )
   })
  }

  return(
    <>
    <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
      <div className='job-card'>
       <Card>
        {renderJobCard()}
       </Card>
      </div>
    </TinderCard>
      </div>
    </>
  )
}
export default JobCard