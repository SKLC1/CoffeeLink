import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"


function ExplorePage(){
  const [cards,setCards] = useState([])

  useEffect(()=>{
   showJobsToUser()
  },[])

  async function showJobsToUser(){
    const {data} = await axios.get('http://localhost:5000/jobs')
    setCards(data)
  }
  const renderCards = cards.map((card)=>{
    return;
  })
  
  return(
    <>
      <div>
        
      </div>
    </>
  )
}
export default ExplorePage