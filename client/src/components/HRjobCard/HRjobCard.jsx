import { Link } from 'react-router-dom';
import { Item } from '../../StyledComponents/Item.style';
import './HRjobCard.css'

function HRjobCard({job}) {
  return ( 
    <>
    <Link to={`/review${job._id}`}>
     <Item>
       <h2>{job.company}</h2>
       <h4>{job.role_title}</h4>
     </Item>
    </Link>
    </>
   );
}

export default HRjobCard;