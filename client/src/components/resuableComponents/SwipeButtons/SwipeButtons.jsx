import { Form } from "../../../StyledComponents/Form.style";
import { JustFlexRow } from "../../../StyledComponents/JustFlexRow";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { CircleButton } from "../../../StyledComponents/CircleButton";


function SwipeButtons() {
  return ( 
    <>
      <Form>
        <JustFlexRow>
           <CircleButton>
            <FavoriteIcon style={{color: 'hsl(210,99%,50%)'}}/>
           </CircleButton>
           <CircleButton>
            <CloseIcon  style={{color: 'red'}}/>
           </CircleButton>
        </JustFlexRow>
      </Form>
    </>
   );
}

export default SwipeButtons;