import { Link } from 'react-router-dom';
import './HRjobCard.css'

function HRjobCard({job}) {
  return ( 
    <>
    <Link to={`/review${job._id}`}>
     <div className='hr-job-card'>
       <div>{job.company}</div>
       <div>{job.role_title}</div>
     </div>
    </Link>
    </>
   );
}

export default HRjobCard;