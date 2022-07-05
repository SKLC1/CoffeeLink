import './HRjobCard.css'

function HRjobCard({job}) {
  return ( 
    <>
     <div className='hr-job-card'>
       <div>{job.company}</div>
       <div>{job.role_title}</div>
     </div>
    </>
   );
}

export default HRjobCard;