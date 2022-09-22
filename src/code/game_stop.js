import game_active from "./game_active";

const url = "https://gruppe5.toni-barth.com/";

//Stop the game if is owner

export default async function game_stop(game_id = window.game_id, player_id = window.player_id) {

    //only able if the game is active
    if (await game_active(game_id) === false) return false;

    //Fetch request to patch
    return fetch(url + "games/" + game_id + "/" + player_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            //action end
            "action" : "end"
        })
    })
    .then(response => {return true})
    .catch(error => {
        console.log(error);
        return false;
    });

}