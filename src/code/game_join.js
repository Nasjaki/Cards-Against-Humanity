import game_active from "./game_active";


const url = "https://gruppe5.toni-barth.com/";

export default async function game_join(game_id, player_id = window.player_id) {

    //Go to login
    if (player_id === -1) {return "Login"}

    //Game not active
    if (await game_active(game_id)) return "Error";
    
    return await fetch(url + "games/" + game_id + "/" + player_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "action" : "join"
        })
    })
    .then(response => response.json)
    .then(json => {
        window.game_id = game_id;
        return "Game";
    })
    .catch(error => {
        console.log(error);
        return false;
    });
    
}