import axios from "axios";
import TinderCard from "react-tinder-card";
import './CVcard.css'


function CVcard({cvObj, jobID, preferences}) {
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

  function renderCVbyPreferences(cv, preferenceArray){
    console.log(cv);
    const preferences = ['name','education','experience','skills','languages']
    return preferences.map(category=>{
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