import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import JobCard from "../resuableComponents/jobCard/jobCard.jsx"
import RotateLoader from "react-spinners/RotateLoader";



function ExplorePage(){
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
   showJobsToUser()
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