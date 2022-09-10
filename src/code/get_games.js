
const url = "https://gruppe5.toni-barth.com/";

export default async function get_games(game_id = -1) {


    return await fetch(url + "games/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(result => result.json())
    .then( json => {


        if (game_id !== -1) { 
            for(var i in json.games) {
                if (game_id == json.games[i].id) {
                    
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