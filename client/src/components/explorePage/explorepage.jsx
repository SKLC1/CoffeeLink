import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import JobCard from "../resuableComponents/jobCard/jobCard.jsx"
import RotateLoader from "react-spinners/RotateLoader";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";


function ExplorePage(){
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
   if(currentUser){
     showJobsToUser()
   } else {
     navigate('/login')
   }
  },[])

  async function showJobsToUser(){
    const {data} = await axios.get('http://localhost:5000/jobs')
    setCards(data)
    setLoading(false)
  }
  function renderCards(){
    return cards.map((card)=>{
      return <JobCard card={card} key={card._id}/>;
    })
  }
  
  return(
    <>
      <div>
        <RotateLoader loading={loading}/>
        {renderCards()}
      </div>
    </>
  )
}
export default ExplorePage