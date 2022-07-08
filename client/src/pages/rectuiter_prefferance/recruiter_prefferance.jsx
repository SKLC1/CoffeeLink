import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function RecruiterPreference({currentUser}) {
  const {job} = useParams()
  const [jobDetails, setJobDetails] = useState({})
  const [preferences, setPreferences] = useState([])

  // const preferences = ['name','education','experience','skills','languages']
  useEffect(()=>{
    getUpdatedPreferences()
  },[])

  async function getUpdatedPreferences(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    setJobDetails(data)
    setPreferences(data.preferences)
  }
  function renderPreferences(){
    return preferences.map(category=>{
       return <div key={category}>{category}</div>
    })
  }

  return ( 
    <>
     <div>Preference page for {jobDetails && jobDetails.company}</div>
     {renderPreferences()}
    </>
   );
}

export default RecruiterPreference;