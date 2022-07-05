import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExplorePage from './components/explorePage/explorepage.jsx';
import Navbar from './components/navbar/navbar.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';
import CVupload from './pages/cvUpload/cvUpload.jsx';
import MyJobs from './pages/myJobs/myJobs.jsx';
import RecruiterProfile from './pages/recruiterProfile/recruiterProfile.jsx';
import WorkerProfile from './pages/workerProfile/workerProfile.jsx';
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
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/login' element={<WelcomePage/>}></Route>
          <Route exact path='/' element={<ExplorePage/>}></Route>
          <Route exact path='/recruiter_profile' element={<RecruiterProfile/>}></Route>
          <Route exact path='/myJobs:id' element={<MyJobs/>}></Route>
          <Route exact path='/profile' element={<WorkerProfile/>}></Route>
          <Route exact path='/profile/cv_upload' element={<CVupload/>}></Route>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
