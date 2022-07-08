import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function RecruiterPreference({currentUser}) {
  const {job} = useParams()
  const [jobDetails, setJobDetails] = useState({})
  const [preferences, setPreferences] = useState([])

  useEffect(()=>{
    getUpdatedPreferences()
  },[])

  async function getUpdatedPreferences(){
    const {data} = await axios.get(`http://localhost:5000/jobs/${job}`)
    setJobDetails(data)
    setPreferences(data.preferences)
  }
  async function handleSavePreferences(){
    const {data} = axios.patch(`http://localhost:5000/jobs/${job}`,{prop: 'preferences', value: preferences})
  }

  //drag secrions
  function handleOnDragEnd(result){
    if(!result.destination) return;
    const items = Array.from(preferences)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPreferences(items)
    console.log(preferences);
  }

  function renderPreferences(){
    return(
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="preferences">
            {(provided)=>(
              <ul {...provided.droppableProps} ref={provided.innerRef}>
              {preferences.map((category,idx)=>{
                return(
                  <Draggable key={category} draggableId={category} index={idx}>
                  {(provided)=>(
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                     {category}
                    </li>
                  )}  
                </Draggable>
                ) 
              })}
              {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      )
  }

  return ( 
    <>
     <div>Preference page for {jobDetails && jobDetails.company}</div>
       {renderPreferences()}
      <button onClick={handleSavePreferences}>Save Preferences</button>
    </>
   );
}

export default RecruiterPreference;