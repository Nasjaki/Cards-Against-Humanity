
const url = "https://gruppe5.toni-barth.com/";

export default async function get_black_card(game_id = window.game_id, player_id = window.player_id) {
    try {
        let response = await fetch(url + "games/" + game_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();
        let czar_id = json.czar.id;

        let re = "";
        (czar_id === player_id) ? re = "Czar" : re = "Player";

        return re;
        
    } catch (ex) {
        console.error(ex);
    }
}