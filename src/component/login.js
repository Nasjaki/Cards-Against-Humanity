
import React from 'react';
import create_player from '../code/create_player';
import delete_player from '../code/delete_player';
import get_players from '../code/get_players';

async function newPlayerHandle() {
    await create_player("James");    
}

async function debugPlayers() {
    //aa
    let re = await get_players();    
    console.log(re.players);
}
async function deletePlayers() {
    await delete_player();    
}

export default function Login () {
    return <div>
        <h2>Login</h2>

        <div className='Login-Buttons'>
            <button id = "Create-User-Button" onClick={newPlayerHandle}> Create User </button>
            <button id = "Debug-User-Button" onClick={debugPlayers}> Debug Players </button>
            <button id = "Delete-User-Button" onClick={deletePlayers}> Delete Players </button>
        </div>
        
    </div>
}
