import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CVcard from '../../components/resuableComponents/CVcard/CVcard';
import { BottomNav } from '../../StyledComponents/BottomNav';
import { CardContainer } from '../../StyledComponents/CardContainer';
import { FlexCustom } from '../../StyledComponents/flexCustom';
import { Button } from '../../StyledComponents/Button.style.jsx'
import { NavButton } from '../../StyledComponents/Navbar.style';
import { Title } from '../../StyledComponents/Title.style';

function ReviewCV() {
  const [CVList, setCVList] = useState([])
  const {job} = useParams();
  
  useEffect(()=>{
    getCVlist()
  },[])
  
  async function getCVlist(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    const cvList = data.applicants;
    console.log(cvList);
    setCVList(cvList)
  }
  
  function renderCVlist(){
    return CVList.map(cvObj=>{
      return <CVcard jobID={job} cvObj={cvObj} key={cvObj.applicantID}/>
    })
  }


  return ( 
    <div>
      <FlexCustom direction={'column'} align={'center'} justify={'space-between'} height={'90vh'}>
      <CardContainer>
        {CVList.length === 0 ? <Title>no applicants yet</Title> : renderCVlist()}
      </CardContainer>
      <BottomNav backgroundColor={'hsl(212,99%,49%)'}>
         <Link to={`/my_preferences${job}`}><NavButton>Job's preferences</NavButton></Link>
         <Link to={`/hr_matches${job}`}><NavButton>Job's Matches</NavButton></Link>
      </BottomNav>
      </FlexCustom>
    </div>
   );
}

export default ReviewCV;