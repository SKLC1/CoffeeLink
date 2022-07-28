import axios from "axios";
import { useState } from "react";
import CVcard from "../../components/resuableComponents/CVcard/CVcard";
import { Button } from "../../StyledComponents/Button.style";
import { CVCategory } from "../../StyledComponents/CVcategory";
import { Form } from "../../StyledComponents/Form.style";
import { JustFlexRow } from "../../StyledComponents/JustFlexRow";
import * as mockData from './cvMockData.json'

function GenerateCV() {
  const [profileID, setProfileID] = useState('');
  const [errMsg, setErrMsg] = useState('');
  

  function setProfileIDfromLink(link){
    const idArr = link.split('/in/')
    const id = idArr[1].slice(0, -1)
    console.log(id);
    setProfileID(id)
  }

  async function getCVfromProfile(){
    const options = {
      method: 'POST',
      url: 'https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '790c49838emsh3ea198d15b48c98p13b0dbjsnbb100aefa817',
        'X-RapidAPI-Host': 'linkedin-profiles-and-company-data.p.rapidapi.com'
      },
      data: `{"profile_id":${profileID},"profile_type":"personal","contact_info":false,"recommendations":false,"related_profiles":false}`
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      // getCVfromData(response.data) when api works uncomment
    }).catch(function (error) {
      console.error(error);
    });
  }

  function getCVfromData(){
    const data = mockData.default;
    console.log(data);
    const educationsArr = data.education.map((educationItem) => {
      const educationItemString =`${educationItem.date.start.year} - ${educationItem.date.end.year}: ${educationItem.degree_name}, ${educationItem.field_of_study}`
      return educationItemString
    }); 
    const positionsArr = data.position_groups.map((position) => {
      const positionString =`${position.date.start.year} - ${position.date.end.year}: ${position.profile_positions[0].title} at ${position.company.name}`
      return positionString
    }); 

    const cv = {
      name: data.first_name+' '+data.last_name,
      title: data.sub_title,
      about: data.summary,
      education: educationsArr.toString(),
      experience: positionsArr.toString(),
      skills: data.skills.toString(),
    } 
    console.log(cv);

    const preferences = ['name','about','education','experience','skills','languages']
    return preferences.map(category=>{
      return( 
       <div key={category} >
         <CVCategory>
         <h4>{category !== 'name' &&`${category}: `}</h4> 
         {category === 'name'? <h2>{cv[category]}</h2>:<p>{cv[category]}</p>} 
         </CVCategory>
       </div>
      )
   })
  }

  async function handleSubmit(cv){
  //   try {
  //     e.preventDefault();
  //     const curUserId = currentUser.loggedUser._id
  //     const {data} = await axios.patch(`${baseUrl}/users/addCV/${curUserId}`,{cv})
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error); 
  //   }
  }

  return ( 
    <>
    <Form>
      <h2>Generate CV</h2>
      <input onChange={(e)=>setProfileIDfromLink(e.target.value)}></input>
      <Button onClick={getCVfromProfile}>Generate</Button>
      {errMsg}
    </Form>
    <JustFlexRow>
      <h1>Preview:</h1>
    </JustFlexRow>
    <Form>
      {getCVfromData()}
      <Button onClick={handleSubmit}>Save</Button>
    </Form>
    </>
   );
}

export default GenerateCV;