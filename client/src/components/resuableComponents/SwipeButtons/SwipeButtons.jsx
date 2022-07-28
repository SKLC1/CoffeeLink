import { Form } from "../../../StyledComponents/Form.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { CircleButton } from "../../../StyledComponents/CircleButton";
import { useEffect, useState } from "react";

function SwipeButtons({CVlist}) {
  const [list, setList] = useState([])

  useEffect(()=>{
    console.log(CVlist);
  },[])

  function handleApprove(){

  }
  function handleDeny(){
    
  }

  return ( 
    <>
      <div>
        <JustFlexRow>
           <CircleButton onClick={()=>(handleApprove())}>
            <FavoriteIcon style={{color: 'hsl(210,99%,50%)'}}/>
           </CircleButton>
           <CircleButton onClick={()=>(handleDeny())}>
            <CloseIcon  style={{color: 'red'}}/>
           </CircleButton>
        </JustFlexRow>
      </div>
    </>
   );
}

export default SwipeButtons;