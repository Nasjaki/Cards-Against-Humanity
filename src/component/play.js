import React from 'react';

import create_game from '../code/create_game';
import get_games from '../code/get_games';
import delete_game from '../code/delete_game';
import game_join from '../code/game_join';

import { useNavigate } from "react-router-dom";


 
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
      console.log(running);
      if (running) {
         navigate("/game");
      } else {
         navigate("/login");
      }
   } 
   async function joinGameHandle() {
      let joined = await game_join(document.getElementById("Join-Game-Input").value, window.player_id);

      switch(joined) {
         case("Game"):
            navigate("/game");
         break;
         case("Login"):
            navigate("/login");
         break;
         case("Error"):
            console.log("Error");
         break;
      }
   } 

 return <div className='Play-Header'>
    <h1>Play</h1>
    <button id = "Create-Game-Button" onClick={createGameHandle}> Create Game </button>
    <button id = "Debug-Games-Button" onClick={debugGamesHandle}> Debug Games </button>
    <button id = "Delete-Game-Button" onClick={deleteGameHandle}> Delete Game </button>
    <button id = "Join-Game-Button" onClick={joinGameHandle}> Join Game </button>

   <input id = "Join-Game-Input" placeholder='Game ID'></input>

 </div>
 
}
