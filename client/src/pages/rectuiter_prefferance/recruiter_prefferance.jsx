import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function RecruiterPreference({currentUser}) {
  const {job} = useParams()
  console.log(job);

  // const preferences = ['name','education','experience','skills','languages']
  useEffect(()=>{
    getUpdatedPreferences()
  },[])

  async function getUpdatedPreferences(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    console.log(data);
  }

  
  return ( 
    <>
     <div>Preference page for {job}</div>
    </>
   );
}

export default RecruiterPreference;