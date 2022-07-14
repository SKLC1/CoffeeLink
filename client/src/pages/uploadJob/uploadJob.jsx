import { TextField } from "@mui/material";
import axios from "axios";
import { useContext,useState } from "react";
import { Button } from "../../StyledComponents/Button.style";
import { Form } from "../../StyledComponents/Form.style";
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

      <Form>
      <h2>Inset your Job Details here:</h2>
      <form onSubmit={handleSubmit}>
         <TextField margin="dense" label='Company Name' name="company" type='text' onChange={handleChange}/>
         <TextField margin="dense" label='Role Title' name="role_title" type='text' onChange={handleChange}/>  
         <TextField margin="dense" label='Description' name="job_description" type='text' onChange={handleChange}/>  
         <TextField margin="dense" label='Requirements' name="job_requirements" type='text' onChange={handleChange}/>  
         <TextField margin="dense" label='Location' name="location" type='text' onChange={handleChange}/>  
        <h3>Type: <select name="job_type" placeholder="select" onChange={handleChange}>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Regular">Office</option>
                  </select></h3>
        <h3>Job Times: <select name="job_time" onChange={handleChange}>
                    <option value="full_time">Full time</option>
                    <option value="part_time">Part time</option>
                  </select></h3>

        <Button  type="submit">Post</Button>
      </form>
      </Form>
    </div>
   );
}

export default UploadJob;