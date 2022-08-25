
const url = "https://gruppe5.toni-barth.com/";

export default async function game_leave(game_id = window.game_id, player_id = window.player_id) {
    
    try {

        let response = await fetch(url + "games/" + game_id + "/" + player_id, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "action" : "leave"
            })
        });


        console.log("player: " + player_id + " left the game: " + game_id);
        
        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}