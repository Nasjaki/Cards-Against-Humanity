
import React from 'react';
import game_leave from '../code/game_leave';


import { useNavigate } from "react-router-dom";


export default function Game (){
    let navigate = useNavigate();

    async function leaveGameHandle() {
        let left = await game_leave();
        console.log(left);
    
        if (left) {
            navigate("/");
        } 
    }

    return <div>
        <h1>Game</h1>
        <h2>{window.game_id}</h2>

        <button id = "Leave-Game-Button" onClick={leaveGameHandle}> Leave Game </button>
       

       
    </div>
}