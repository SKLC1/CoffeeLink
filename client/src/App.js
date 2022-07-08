import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExplorePage from './components/explorePage/explorepage.jsx';
import Navbar from './components/navbar/navbar.jsx';
import SignUp from './components/welcomePage/signup/signup.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';
import CVupload from './pages/cvUpload/cvUpload.jsx';
import MyJobs from './pages/myJobs/myJobs.jsx';
import RecruiterProfile from './pages/recruiterProfile/recruiterProfile.jsx';
import RecruiterPreference from './pages/rectuiter_prefferance/recruiter_prefferance.jsx';
import ReviewCV from './pages/reviewCV/reviewCV.jsx';
import UploadJob from './pages/uploadJob/uploadJob.jsx';
import WorkerMatches from './pages/workerMatches/workerMatches.jsx';
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
          <Route exact path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/' element={<ExplorePage/>}></Route>
          <Route exact path='/recruiter_profile' element={<RecruiterProfile/>}></Route>
          <Route exact path='/myJobs:id' element={<MyJobs/>}></Route>
          <Route exact path='/my_preferences:job' element={<RecruiterPreference currentUser={currentUser}/>}></Route>
          <Route exact path='/review:job' element={<ReviewCV/>}></Route>
          <Route exact path='/profile' element={<WorkerProfile/>}></Route>
          <Route exact path='/my_matches' element={<WorkerMatches currentUser={currentUser}/>}></Route>
          <Route exact path='/cv_upload' element={<CVupload/>}></Route>
          <Route exact path='/post_job' element={<UploadJob/>}></Route>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
