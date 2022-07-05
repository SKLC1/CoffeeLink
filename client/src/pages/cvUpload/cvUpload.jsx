import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

function CVupload() {
  const {currentUser} = useContext(UserContext)

  const [cv, setCV] = useState({
    name:"",
    email:"",
    education:'',
    experience:'',
    skills:'',
    languages:'',
    imgURL:'',
    imgLinkTo:'',
  })

  function handleChange(e){
     const {name, value} = e.target;
    setCV((prev)=>{
      return {...prev, [name]: value}
    })
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log(cv);
    const curUserId = currentUser.loggedUser._id
    console.log(curUserId);
    const {data} = await axios.patch(`http://localhost:5000/users/addCV/${curUserId}`,{cv})
    console.log(data);
  }

  return ( 
    <div>
      <p>upload your CV here:</p>
      <form onSubmit={handleSubmit}>
        <h3>Full Name: <input name="name" type='text' onChange={handleChange}/></h3>
        <h3>Email: <input name="email" type='text' onChange={handleChange}/></h3>
        <h3>education: <input name="education" type='text' onChange={handleChange}/></h3>
        <h3>experience: <input name="experience" type='text' onChange={handleChange}/></h3>
        <h3>skills: <input name="skills" type='text' onChange={handleChange}/></h3>
        <h3>languages: <input name="languages" type='text' onChange={handleChange}/></h3>
        <h3>imgURL: <input name="imgURL" type='text' onChange={handleChange}/></h3>
        <h3>imgLinkTo: <input name="imgLinkTo" type='text' onChange={handleChange}/></h3>
        <button  type="submit">Save</button>
      </form>
    </div>
   );
}

export default CVupload;