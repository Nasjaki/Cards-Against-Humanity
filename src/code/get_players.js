

const url = "https://gruppe5.toni-barth.com/";

//Receive all players that are logged in -> Debug only

export default async function get_players(player_id = -1) {

    //Fetch get request
    return await fetch(url + "players/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {
        //Check for all players if player id not specified
        if (player_id !== -1) {
            for(var i in json) {
                //else return only 1 player info
                if(json[i].id == player_id) return json[i];
            }
        }
        return json
    });
    
    
}