import game_active from "./game_active";


const url = "https://gruppe5.toni-barth.com/";

export default async function game_join(game_id, player_id = window.player_id) {

    if (player_id === -1) {return "Login"}

    if (await game_active(game_id)) return "Error";
    
    try {
        
        let response = await fetch(url + "games/" + game_id + "/" + player_id, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "action" : "join"
            })
        });
        let json = await response.json();
        console.log(json);

        console.log("player: " + player_id + "joined the game: " + game_id);
        window.game_id = game_id;
            
        return "Game";
        
    } catch (ex) {
        console.error(ex);
    }
    
}