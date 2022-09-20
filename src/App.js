
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
import game_leave from './code/game_leave';



window.game_id = -1;
window.player_id = -1;


function App() {

  const [toggle, setToggle] = useState(false);

  function setToggleHandle() {

    if (window.game_id == -1) {
      setToggle(!toggle);
    }

  }

  async function leave_game_handle() {
    if (window.game_id != -1) {
      game_leave();
    }
   
  }

  return (
    <div className="App">
        <Router>
          <div className="App">
            {toggle ?<div className='Router-Header'>
                <ul className = 'Router-List'>
                  <li>
                    <Link to="/">
                      <button className='Header-Buttons' onClick={() => leave_game_handle()}> Home </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button className='Header-Buttons' onClick={() => leave_game_handle()}> Login </button>
                    </Link>
                    
                  </li>
                  <li>
                    <Link to="/play">
                      <button className='Header-Buttons' onClick={() => leave_game_handle()}> Play </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards">
                      <button className='Header-Buttons' onClick={() => leave_game_handle()}> Cards </button>
                    </Link>
                  </li>

                </ul>
              </div> : null}
              <IoGrid className='ToggleHeader' onClick = {() => setToggleHandle()}/>
              
          </div>

          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/play' element={<Play/>}></Route>
            <Route exact path='/game' element={<Game/>} > </Route>
            <Route exact path='/cards' element={<Cards/>}> </Route>
            <Route path= "*" element = {<ErrorPage/>}/>
          </Routes>
        </Router>

    </div>


  );
}

export default App;
