import { useParams } from "react-router-dom";


function RecruiterPreference({currentUser}) {
  const {job} = useParams()
  console.log(job);

  // const preferences = ['name','education','experience','skills','languages']
  
  
  return ( 
    <>
     <div>Preference page for {job}</div>
    </>
   );
}

export default RecruiterPreference;