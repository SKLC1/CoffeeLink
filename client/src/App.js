import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExplorePage from './components/explorePage/explorepage.jsx';
import Navbar from './components/navbar/navbar.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';
import RecruiterProfile from './pages/recruiterProfile/recruiterProfile.jsx';
import { UserContext } from './UserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(()=>{
    const data = window.localStorage.getItem('CURRENT_USER')
    setCurrentUser(JSON.parse(data))
  },[])

  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/login' element={<WelcomePage/>}></Route>
          <Route exact path='/' element={<ExplorePage/>}></Route>
          <Route exact path='/recruiter_profile' element={<RecruiterProfile/>}></Route>
  
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
