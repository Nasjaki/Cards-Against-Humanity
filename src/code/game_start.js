
const url = "https://gruppe5.toni-barth.com/";

export default async function game_start(game_id = window.game_id, player_id = window.player_id) {
    
    try {

        let response = await fetch(url + "games/" + game_id + "/" + player_id, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "action" : "start"
            })
        });


        console.log("player: " + player_id + " started the game: " + game_id);
        
        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}