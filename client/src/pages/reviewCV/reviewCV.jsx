import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CVcard from '../../components/resuableComponents/CVcard/CVcard';
import { BottomNav } from '../../StyledComponents/BottomNav';
import { CardContainer } from '../../StyledComponents/CardContainer';
import { FlexCustom } from '../../StyledComponents/flexCustom';
import { Button } from '../../StyledComponents/Button.style.jsx'
import { NavButton } from '../../StyledComponents/Navbar.style';
import { Form } from '../../StyledComponents/Form.style.jsx';
import BarLoader from "react-spinners/BarLoader";
import { JustFlexRow } from '../../StyledComponents/JustFlexRow';
import { baseUrl } from '../../components/resuableComponents/baseURL';
import SwipeButtons from '../../components/resuableComponents/SwipeButtons/SwipeButtons';


function ReviewCV({socket}) {
  const [CVList, setCVList] = useState([])
  const {job} = useParams();
  const [loading,setLoading] = useState(true)
  
  useEffect(()=>{
    getApplicantsIDs()
  },[])
  
  async function getApplicantsIDs(){
    const {data} = await axios.get(`${baseUrl}/jobs/${job}`)
    const arrOfApplicantIDs = data.applicants;
    getApplicantsData(arrOfApplicantIDs)
  }
  async function getApplicantsData(idArr){
    const promiseArr = idArr.map(id=> {
      return axios.get(`${baseUrl}/users/${id.applicantID}`)
    })
    const res = await Promise.all(promiseArr)
    console.log(res);
    if(res.length > 0){
      const [{data}] = res;
      setCVList([...CVList, {cv: data.cv, applicantID: data._id}])
    }
      setLoading(false)
  }
  
  function renderCVlist(){
    return CVList.map(cvObj=>{
      return <CVcard jobID={job} cvObj={cvObj} key={cvObj.applicantID} socket={socket}/>
    })
  }

  return ( 
    <div>
      <JustFlexRow>
       <BarLoader loading={loading}/>
      </JustFlexRow>
      <FlexCustom direction={'column'} align={'center'} justify={'space-between'} height={'90vh'}>
      <CardContainer>
        {CVList.length === 0 ? !loading && <Form> No applicants yet</Form> : renderCVlist()}
      </CardContainer>
       <SwipeButtons CVList={CVList}/>
      <BottomNav backgroundColor={'hsl(212,99%,49%)'}>
         <Link to={`/my_preferences${job}`}><NavButton>Job's preferences</NavButton></Link>
         <Link to={`/hr_matches${job}`}><NavButton>Job's Matches</NavButton></Link>
      </BottomNav>
      </FlexCustom>
    </div>
   );
}

export default ReviewCV;