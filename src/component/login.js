
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
  


export default function Login () {
    const navigate = useNavigate();
    const[player_name, set_player_name] = useState("");

    //Add new player
    async function newPlayerHandle() {
        let name_str = document.getElementById("Name-Input").value;
        //Name has to be longe than 2 characters
        if (name_str.length > 2) {
            await create_player(name_str);  
            set_player_name(name_str);
            //Reset name field
            document.getElementById("Name-Input").value = "";
            //navigate to play section
            navigate("/Play");
        }

        
    }

    return <div>
        <h1>Login</h1>
        <input className='Game-Buttons Button-Block' id = "Name-Input" placeholder='Name' maxLength="12"></input>
            
            
            <button className='Game-Buttons Button-Block' id = "Create-User-Button" onClick={newPlayerHandle}> {(player_name === "") ? "Create User" : player_name} </button> 
            

    </div>
}
