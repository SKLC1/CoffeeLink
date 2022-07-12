import axios from 'axios';
import TinderCard from 'react-tinder-card'
import { JustFlexRowCV } from '../../../StyledComponents/JustFlexRow';
import './jobCard.css'

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
    const {data} = await axios.patch('http://localhost:5000/jobs',{
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
    console.log(card);
    return card.map(category=>{
      return(
       <div key={category} >
         <JustFlexRowCV>
         <h4>{category !== 'name' &&`${category}: `}</h4> 
         {category === 'name'? <h2>{card[category]}</h2>:<p>{card[category]}</p>} 
         </JustFlexRowCV>
       </div>
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
       {renderJobCard}
      </div>
    </TinderCard>
      </div>
    </>
  )
}
export default JobCard