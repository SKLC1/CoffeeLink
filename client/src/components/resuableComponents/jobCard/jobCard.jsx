import axios from 'axios';
import TinderCard from 'react-tinder-card'
import './jobCard.css'

function JobCard({card}){
  
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
    
  }

  return(
    <>
    <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
      <div className='job-card'>
       <div>{card.company}</div>
       <div>{card.role_title}</div>
       <div>{card.job_description}</div>
      </div>
    </TinderCard>
      </div>
    </>
  )
}
export default JobCard