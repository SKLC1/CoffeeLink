
import { CVimage } from "../../../StyledComponents/CVimage.style"

function RenderCVimg({imgURL , link}){

    return(
      <>
        <a href={link}>
          <CVimage>
           <img src={imgURL} width='300px'></img>
          </CVimage>
        </a>
      </>
    )
  }

  export default RenderCVimg