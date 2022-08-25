
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Login from "./component/login.js";
import Play from "./component/play.js";
import Home from "./component/home.js";
import Game from "./component/game.js";
import ErrorPage from "./component/errorpage.js";

window.game_id = -1;
window.player_id = -1;


function App() {
  return (
    <div className="App">
      
        <Router>
          <div className="App">
              <div className='Router-Header'>
                <ul className = 'Router-List'>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/play">Play</Link>
                  </li>
                </ul>
              </div>
          </div>

          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/play' element={<Play/>}></Route>
            <Route exact path='/game' element={<Game/>}></Route>
            <Route path= "*" element = {<ErrorPage/>}/>
          </Routes>
        </Router>

        
        
        
      
    </div>
  );
}

export default App;
