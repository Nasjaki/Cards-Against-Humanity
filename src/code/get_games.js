
const url = "https://gruppe5.toni-barth.com/";

//get all games from the server

export default async function get_games(game_id = -1) {

    //Fetch a Get request
    return await fetch(url + "games/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then( json => {

        //When the game_id is not given it returns every game
        if (game_id !== -1) { 
            
            for(var i in json.games) {
                if (game_id == json.games[i].id) {
                    //else only the specific one
                    return json.games[i];
                }
            }
        }

        //default
        return json.games;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    
}