import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import JobCard from "../resuableComponents/jobCard/jobCard.jsx"
import BarLoader from "react-spinners/BarLoader";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Form } from "../../StyledComponents/Form.style.jsx";
import { Input } from "../../StyledComponents/Input.style.jsx";
import { Button } from "../../StyledComponents/Button.style.jsx";
import { JustFlexRow } from "../../StyledComponents/JustFlexRow.jsx";
import {baseUrl} from '../resuableComponents/baseURL.jsx'

function ExplorePage(){
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)
  const [isCV,setIsCV] = useState(false)
  const [keyword,setKeyword] = useState("")
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
   isLoggedIn()
   isCVinCurrentUser(currentUser && currentUser.loggedUser._id)
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
  function MustHaveCVMsg(){
    return(
      <Form>
        <h3>Sorry</h3>
        <h4>You Must Upload your Dynamic CV first</h4>
        <Link to='/cv_upload'><Button>Upload CV</Button></Link>
      </Form>
    )
  }

  async function isCVinCurrentUser(id){
    try {
    const {data} = await axios.get(`${baseUrl}/${id}`)
    console.log(data);
    if(data.cv){
      setIsCV(true)
    }
    } catch (error) {
     console.log(error); 
    }
  }
  
  return(
    <>
      <div>
        <Form>
        <h3>Filter By Key words</h3>
        <Input onChange={(e)=>setKeyword(e.target.value)} type='text' placeholder="search"></Input>
        </Form>
        <JustFlexRow>
        <BarLoader loading={loading}/>
        </JustFlexRow>
        {isCV?renderCards():!loading && <MustHaveCVMsg/>}
      </div>
    </>
  )
}
export default ExplorePage