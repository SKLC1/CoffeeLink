import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Item } from "../../StyledComponents/Item.style";
import { Title } from "../../StyledComponents/Title.style";
import { Button } from "../../StyledComponents/Button.style";
import { JustFlexRow } from "../../StyledComponents/JustFlexRow";

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
    const {data} = await axios.patch(`http://localhost:5000/jobs/${job}`,{prop: 'preferences', value: preferences})
    console.log(data);
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
                    <Item {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                     <h4>
                     {category}
                     </h4>
                    </Item>
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
     <Title><h5>Set your Viewing Order For</h5>
       <h4>{jobDetails && jobDetails.company} {jobDetails && jobDetails.role_title}</h4>
     </Title>
       {renderPreferences()}
       <JustFlexRow>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
       </JustFlexRow>
    </>
   );
}

export default RecruiterPreference;