import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { baseUrl } from "../../components/resuableComponents/baseURL";
import CVcard from "../../components/resuableComponents/CVcard/CVcard";
import { Button } from "../../StyledComponents/Button.style";
import { CVCategory } from "../../StyledComponents/CVcategory";
import { Form } from "../../StyledComponents/Form.style";
import { JustFlexRow } from "../../StyledComponents/JustFlexRow";
import * as mockData from './cvMockData.json'
import { Card } from "../../StyledComponents/Card.style";

function GenerateCV() {
  const [profileID, setProfileID] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [cv, setCV] = useState({});
  const {currentUser} = useContext(UserContext)


  function setProfileIDfromLink(link){
    const idArr = link.split('/in/')
    const id = idArr[1].slice(0, -1)
    console.log(id);
    setProfileID(id)
  }

  async function getDataFromProfile(){
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
      getCVfromData(response.data)
    }).catch(function (error) {
      setErrMsg(error)
      console.error(error);
    });
  }

  function getCVfromData(){
    const data = mockData.default;
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
    setCV(cv)
  }

  function renderPreview(){
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

  async function handleSubmit(cvObj){
    try {
      const curUserId = currentUser.loggedUser._id
      const {data} = await axios.patch(`${baseUrl}/users/addCV/${curUserId}`,{cvObj})
      console.log(data);
      setErrMsg("Uploaded Successfully!")
    } catch (error) {
      console.log(error); 
      setErrMsg("Something went wrong")
    }
  }

  return ( 
    <>
    <Form>
      <h2>Generate CV</h2>
      <input onChange={(e)=>setProfileIDfromLink(e.target.value)}></input>
      <Button onClick={getDataFromProfile}>Generate</Button>
      <Button onClick={()=>handleSubmit(cv)}>Save</Button>
      {errMsg}
    </Form>
    <JustFlexRow>
      <h1>Preview:</h1>
    </JustFlexRow>
    <JustFlexRow>
     <Card>
      {renderPreview()}
     </Card>
    </JustFlexRow>
    </>
   );
}

export default GenerateCV;