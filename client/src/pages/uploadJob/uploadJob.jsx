import axios from "axios";
import { useContext,useState } from "react";
import { UserContext } from "../../UserContext";


function UploadJob() {
  const {currentUser} = useContext(UserContext)

  const [jobObj, setJobObj] = useState({
    company:"",
    role_title:"",
    job_description:'',
    location:'',
    job_requirements:'',
    job_type:'Remote',
    job_time:'full_time',
    posted_by: currentUser.loggedUser._id,
  })

  function handleChange(e){
     const {name, value} = e.target;
     setJobObj((prev)=>{
      return {...prev, [name]: value}
    })
  }
  async function handleSubmit(e){
    e.preventDefault();
    const curUserId = currentUser.loggedUser._id
    console.log(curUserId);
    const {data} = await axios.post('http://localhost:5000/jobs',{jobObj})
    console.log(data);
    //add job to hr
    addJobToHR(curUserId,data)
  }
  
  async function addJobToHR(userID,job){
    const {data} = await axios.patch(`http://localhost:5000/hr_users/addJob/${userID}`,{job})
    console.log(data);
  }

  return ( 
    <div>
      <p>upload your CV here:</p>
      <form onSubmit={handleSubmit}>
        <h3>Company Name: <input name="company" type='text' onChange={handleChange}/></h3>
        <h3>Role Title: <input name="role_title" type='text' onChange={handleChange}/></h3>
        <h3>Description: <input name="job_description" type='text' onChange={handleChange}/></h3>
        <h3>Requirements: <input name="job_requirements" type='text' onChange={handleChange}/></h3>
        <h3>Location: <input name="location" type='text' onChange={handleChange}/></h3>
        <h3>Type: <select name="job_type" placeholder="select" onChange={handleChange}>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Regular">Office</option>
                  </select></h3>
        <h3>Job Times: <select name="job_time" onChange={handleChange}>
                    <option value="full_time">Full time</option>
                    <option value="part_time">Part time</option>
                  </select></h3>

        <button  type="submit">Post</button>
      </form>
    </div>
   );
}

export default UploadJob;