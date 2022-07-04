import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/navbar.jsx';
import WelcomePage from './components/welcomePage/welcomePage.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/' element={<WelcomePage/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
