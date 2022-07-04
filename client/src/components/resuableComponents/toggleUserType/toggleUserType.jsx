import { useState } from "react"

function ToggleUserType({handleSetUserType}){
  
  return(
    <>
      <button onClick={()=>handleSetUserType('hr')}>I'm a Recruiter</button>
      <button onClick={()=>handleSetUserType('worker')}>I'm Looking for Work</button>
    </>
  )
}
export default ToggleUserType