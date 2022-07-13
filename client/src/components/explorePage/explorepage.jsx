import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import JobCard from "../resuableComponents/jobCard/jobCard.jsx"
import RotateLoader from "react-spinners/RotateLoader";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Form } from "../../StyledComponents/Form.style.jsx";
import { Input } from "../../StyledComponents/Input.style.jsx";
 

function ExplorePage(){
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)
  const [keyword,setKeyword] = useState("")
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
   isLoggedIn()
  },[])
  function isLoggedIn(){
    currentUser?showJobsToUser():navigate('/login')
  }

  async function showJobsToUser(){
    const {data} = await axios.get('http://localhost:5000/jobs')
    setCards(data)
    setLoading(false)
  }
  
  function renderCards(){
    return cards.map((card)=>{
     const arrOfChecks = ['company','role_title','job_description','job_description','job_requirements','location']
     let isValid = false;
     for (const [key, value] of Object.entries(card)) {
       if(arrOfChecks.includes(key.toLowerCase()) && value.toLowerCase().includes(keyword.toLowerCase())){
         isValid = true;
       } 
     }
      if(isValid){
        return <JobCard card={card} key={card._id} currentUser={currentUser}/>;
      }
    })
  }
  function mustHaveCVMsg(){
    return(
      <div>
        <h3>Sorry</h3>
        <div>You Must Upload your Dynamic CV first</div>
        <Link to='/cv_upload'><div>Upload CV</div></Link>
      </div>
    )
  }

  async function isCVinCurrentUser(id){
    const {data} = await axios.get(`http://localhost:5000/users/${id}`)
    if(data.cv){
      return true
    } else {
      return false
    }
  }
  
  return(
    <>
      <div>
        <Form>
        <RotateLoader loading={loading}/>
        <h3>Filter By Key words</h3>
        <Input onChange={(e)=>setKeyword(e.target.value)} type='text' placeholder="search"></Input>
        </Form>
        {isCVinCurrentUser(currentUser && currentUser.loggedUser._id)?renderCards():mustHaveCVMsg()}
      </div>
    </>
  )
}
export default ExplorePage