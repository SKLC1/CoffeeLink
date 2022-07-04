import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExplorePage from './components/explorePage/explorepage.jsx';
import Navbar from './components/navbar/navbar.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/login' element={<WelcomePage/>}></Route>
          <Route exact path='/explore' element={<ExplorePage/>}></Route>
  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
