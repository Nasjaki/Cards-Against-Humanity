import game_active from "./game_active";

const url = "https://gruppe5.toni-barth.com/";

export default async function game_start(game_id = window.game_id, player_id = window.player_id) {

    if (await game_active(game_id) === false) return false;

    fetch(url + "games/" + game_id + "/" + player_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "action" : "end"
        })
    }).then(function(response) {
        console.log("player: " + player_id + " stopped the game: " + game_id);
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

}