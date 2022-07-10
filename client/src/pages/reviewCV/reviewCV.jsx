import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CVcard from '../../components/resuableComponents/CVcard/CVcard';
import { BottomNav } from '../../StyledComponents/BottomNav';
import { CardContainer } from '../../StyledComponents/CardContainer';
import { FlexCustom } from '../../StyledComponents/flexCustom';

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
  function noApplicants(){
    return(
      <>
      <div>no applicants yet</div>
      </>
    )
  }

  return ( 
    <div>
      <FlexCustom direction={'column'} align={'center'} justify={'space-between'} height={'80vh'}>
      <CardContainer>
        {CVList.length === 0?noApplicants():renderCVlist()}
      </CardContainer>
      <BottomNav>
       <Link to={`/my_preferences${job}`}><div>job's preferences</div></Link>
       <div><Link to={`/hr_matches${job}`}>My Matches</Link></div>
      </BottomNav>
      </FlexCustom>
    </div>
   );
}

export default ReviewCV;