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

  return ( 
    <>
      <Form>
        <JustFlexRow>
           {/* <CircleButton onClick={()=> swipe('right') }>
            <FavoriteIcon style={{color: 'hsl(210,99%,50%)'}}/>
           </CircleButton>
           <CircleButton onClick={()=> swipe('left') }>
            <CloseIcon  style={{color: 'red'}}/>
           </CircleButton> */}
        </JustFlexRow>
      </Form>
    </>
   );
}

export default SwipeButtons;