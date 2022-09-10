
const url = "https://gruppe5.toni-barth.com/";

export default async function get_white_cards(game_id = window.game_id, player_id = window.player_id) {
    
    return await fetch(url + "games/" + game_id + "/cards/" + player_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {return json.cards})
        .catch(error => {
            console.log(error);
            return false;
        })
}