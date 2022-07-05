import TinderCard from "react-tinder-card";
import './CVcard.css'

const onSwipe = (direction) => {
  if(direction == 'right'){
    console.log("right");
  } else {
    console.log('left');
    // will need to save so we can not show this card to user again
  }
}

function CVcard({cv}) {
  return ( 
    <>
     <div className='card-container'>
    <TinderCard 
    className='swipe'
    onSwipe={onSwipe}
    preventSwipe={['up','down']}>
      <div className='job-card'>
       <div>{cv.name}</div>
      </div>
    </TinderCard>
      </div>
    </>
   );
}

export default CVcard;