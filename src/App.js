
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

import { useState, useEffect } from "react";



window.game_id = -1;
window.player_id = -1;


function App() {

  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
        <Router>
          <div className="App">
            {toggle ?<div className='Router-Header'>
                <ul className = 'Router-List'>
                  <li>
                    <Link to="/">
                      <button className='Header-Buttons'> Home </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button className='Header-Buttons'> Login </button>
                    </Link>
                    
                  </li>
                  <li>
                    <Link to="/play">
                      <button className='Header-Buttons'> Play </button>
                    </Link>
                  </li>
                </ul>
              </div> : null}
              <button onClick = {() => setToggle(!toggle)}>Toggle</button>
          </div>

          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/play' element={<Play/>}></Route>
            <Route exact path='/game' element={<Game/>}> </Route>
            <Route path= "*" element = {<ErrorPage/>}/>
          </Routes>
        </Router>

    </div>

  );
}

export default App;
