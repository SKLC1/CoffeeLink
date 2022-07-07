

function MatchCard({match}) {
  return ( 
    <>
      <div>
        <p>You have a match with {match.company}'s position for {match.role_title}</p>
        <div>Schedule meeting</div>
      </div>
    </>
   );
}

export default MatchCard;