import axios from 'axios';
import TinderCard from 'react-tinder-card'
import './jobCard.css'

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