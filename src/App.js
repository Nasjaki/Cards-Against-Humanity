
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
import Cards from "./component/cards.js";

import { useState, useEffect } from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { IoGrid } from "react-icons/io5";



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
                  <li>
                    <Link to="/cards">
                      <button className='Header-Buttons'> Cards </button>
                    </Link>
                  </li>
                </ul>
              </div> : null}
              <IoGrid onClick = {() => setToggle(!toggle || window.player_id != -1)}/> 
              
          </div>

          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/play' element={<Play/>}></Route>
            <Route exact path='/game' element={<Game/>}> </Route>
            <Route exact path='/cards' element={<Cards/>}> </Route>
            <Route path= "*" element = {<ErrorPage/>}/>
          </Routes>
        </Router>


    </div>


  );
}

export default App;
