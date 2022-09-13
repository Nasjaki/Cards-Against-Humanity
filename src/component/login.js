
import React from 'react';
import create_player from '../code/create_player';
import delete_player from '../code/delete_player';
import get_players from '../code/get_players';
import { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Link,
    useNavigate
  } from 'react-router-dom';
  


async function debugPlayers() {
    console.log(await get_players());
}
async function deletePlayers() {
    await delete_player();    
}

export default function Login () {
    const navigate = useNavigate();

    const[player_name, set_player_name] = useState("");

    async function newPlayerHandle() {
        let name_str = document.getElementById("Name-Input").value;
        if (name_str.length > 2) {
            await create_player(name_str);  
            set_player_name(name_str);
            document.getElementById("Name-Input").value = "";

            navigate("/Play");
        }

        
    }

    return <div>
        <h1>Login</h1>
        <input className='Game-Buttons Button-Block' id = "Name-Input" placeholder='Name'></input>
            
            
            <button className='Game-Buttons Button-Block' id = "Create-User-Button" onClick={newPlayerHandle}> {(player_name === "") ? "Create User" : player_name} </button> 
            
                 
            <button id = "Debug-User-Button" onClick={debugPlayers}> Debug Players </button>
            <button id = "Delete-User-Button" onClick={deletePlayers}> Delete Players </button>

    </div>
}
