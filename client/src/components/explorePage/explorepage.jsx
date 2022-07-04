import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import JobCard from "../resuableComponents/jobCard/jobCard.jsx"


function ExplorePage(){
  const [cards,setCards] = useState([])

  useEffect(()=>{
   showJobsToUser()
  },[])

  async function showJobsToUser(){
    const {data} = await axios.get('http://localhost:5000/jobs')
    setCards(data)
    console.log(cards);
  }
  function renderCards(){
    return cards.map((card)=>{
      console.log(card);
      return <JobCard card={card} key={card._id}/>;
    })
  }
  
  return(
    <>
      <div>
        {renderCards()}
      </div>
    </>
  )
}
export default ExplorePage