
const url = "https://gruppe5.toni-barth.com/";

export default async function get_white_cards(game_id = window.game_id, player_id = window.player_id) {
    try {
        let response = await fetch(url + "games/" + game_id + "/cards/" + player_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();
        let array = json.cards;

        return array;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}