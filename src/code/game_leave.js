
const url = "https://gruppe5.toni-barth.com/";

export default async function game_leave(game_id = window.game_id, player_id = window.player_id) {
    
    return await fetch(url + "games/" + game_id + "/" + player_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "action" : "leave"
        })
    })
    .then(response => {
        window.game_id = -1;
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    });
}