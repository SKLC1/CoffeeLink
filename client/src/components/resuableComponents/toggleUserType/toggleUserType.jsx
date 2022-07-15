import { ToggleButton, ToggleButtonGroup} from '@mui/material'
import { useState } from 'react';

function ToggleUserType({handleSetUserType}){
  const [alignment, setAlignment] = useState('worker');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(event.target.value);
    }
    handleSetUserType(event.target.value)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      size={'small'}
    >
      <ToggleButton value="hr">I'm a Recruiter</ToggleButton>
      <ToggleButton value="worker">I'm Looking for Work</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleUserType
// function ToggleUserType({handleSetUserType}){
  
//   return(
//     <>
//       <button onClick={()=>handleSetUserType('hr')}>I'm a Recruiter</button>
//       <button onClick={()=>handleSetUserType('worker')}>I'm Looking for Work</button>
//     </>
//   )
// }
// export default ToggleUserType