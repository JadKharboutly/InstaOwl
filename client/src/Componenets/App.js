import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

//Components
import Nav from './Nav';
import Home from './Home';
import ResultPage from './ResultPage';
import LoadingPage from './LoadingPage';
import ResultLostFollowers from './ResultLostFollowers';
import Notification from './Notification';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          {/* <Route path="/fetching_data" element={<LoadingPage/>}/> */}
          <Route path="/fakefriend/result" element={<ResultPage/>}/>
          <Route path="/lostfollowers/result" element={<ResultLostFollowers/>}/>
        </Routes>
        <Nav/>
      </Router>
    </div>
  );
}

export default App;
