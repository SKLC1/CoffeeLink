import { useContext, useEffect, useState } from 'react';
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
import io from 'socket.io-client'
import HRMatches from './pages/hrMatches/HRMatches.jsx';
import Chat from './pages/Chat/Chat.jsx';
import './App.css'

// socket connection
const socket = io.connect("http://localhost:5000");

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [notifications, setNotifications] = useState([])

  useEffect(()=>{
    const data = window.localStorage.getItem('CURRENT_USER')
    setCurrentUser(JSON.parse(data))
  },[])

  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser, notifications, setNotifications}}>
      <Router>
        {/*  basename='https://coffee--link.herokuapp.com/' */}
      <Navbar currentUser={currentUser}/>
        <Routes>
          <Route exact path='/login' element={<WelcomePage socket={socket}/>}></Route>
          <Route exact path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/' element={<ExplorePage/>}></Route>
          <Route exact path='/recruiter_profile' element={<RecruiterProfile/>}></Route>
          <Route exact path='/myJobs:id' element={<MyJobs/>}></Route>
          <Route exact path='/my_preferences:job' element={<RecruiterPreference currentUser={currentUser}/>}></Route>
          <Route exact path='/review:job' element={<ReviewCV socket={socket}/>}></Route>
          <Route exact path='/hr_matches:job' element={<HRMatches socket={socket} currentUser={currentUser}/>}></Route>
          <Route exact path='/profile' element={<WorkerProfile/>}></Route>
          <Route exact path='/my_matches' element={<WorkerMatches socket={socket} currentUser={currentUser}/>}></Route>
          <Route exact path='/cv_upload' element={<CVupload/>}></Route>
          <Route exact path='/post_job' element={<UploadJob/>}></Route>
          <Route exact path='/chat:room' element={<Chat socket={socket} currentUser={currentUser}/>}></Route>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
