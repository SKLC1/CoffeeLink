import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExplorePage from './components/explorePage/explorepage.jsx';
import Navbar from './components/navbar/navbar.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';
import { UserContext } from './UserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/login' element={<WelcomePage/>}></Route>
          <Route exact path='/' element={<ExplorePage/>}></Route>
  
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
