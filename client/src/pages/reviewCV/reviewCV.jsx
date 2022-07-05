import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CVcard from '../../components/resuableComponents/CVcard/CVcard';

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
      return <CVcard cv={cvObj.cv} key={cvObj.applicantID}/>
    })
  }

  return ( 
    <div>
      <p>review page</p>
      {renderCVlist()}
    </div>
   );
}

export default ReviewCV;