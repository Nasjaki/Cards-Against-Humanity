import React from 'react';

import create_game from '../code/create_game';
import get_games from '../code/get_games';
import delete_game from '../code/delete_game';
import game_join from '../code/game_join';

import { useNavigate } from "react-router-dom";
import get_game_waiting from '../code/get_game_waiting';

 
async function debugGamesHandle() {
   let gameInfo = await get_games();
   console.log(gameInfo);
}
async function deleteGameHandle() {

   await delete_game();
}



export default function Play (){
   let navigate = useNavigate();

   async function createGameHandle() {
      let running = await create_game(window.player_id);

      if (running) {
         navigate("/game");
      } else {
         navigate("/login");
      }
   } 
   async function joinGameHandle() {
      let joined = await game_join(document.getElementById("Join-Game-Input").value);

      switch(joined) {
         case("Game"):
            navigate("/game");
         break;
         case("Login"):
            navigate("/login");
         break;
         case("Error"):
            console.log("Game already started");
         break;
      }
   } 

   async function joinRandomGameHandle() {
      let not_active_game_id = await get_game_waiting();
   
      console.log(not_active_game_id);
   
      if (not_active_game_id !== false) {
         let joined = await game_join(not_active_game_id);
         
         switch(joined) {
            case("Game"):
               navigate("/game");
            break;
            case("Login"):
               navigate("/login");
            break;
            case("Error"):
               console.log("Game already started");
            break;
         }
      }
   }

 return <div className='Play-Header'>
   <h1>Play</h1>
   
   <div className='Play-Buttons'>
      <button id = "Create-Game-Button" onClick={createGameHandle}> Create Game </button>
      <button id = "Debug-Games-Button" onClick={debugGamesHandle}> Debug Games </button>
      <button id = "Delete-Game-Button" onClick={deleteGameHandle}> Delete Game </button>
      <button id = "Join-Game-Button" onClick={joinGameHandle}> Join Game </button>
      <button id = "Join-Random-Game-Button" onClick={joinRandomGameHandle}> Join Random Game </button>
   </div>

   <input id = "Join-Game-Input" placeholder='Game ID'></input>

 </div>
 
}
