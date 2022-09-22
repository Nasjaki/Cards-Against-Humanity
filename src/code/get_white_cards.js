
const url = "https://gruppe5.toni-barth.com/";

//gets the white cards in the current game for the player

export default async function get_white_cards(game_id = window.game_id, player_id = window.player_id) {
    
    //Fetch request to get the cards
    return await fetch(url + "games/" + game_id + "/cards/" + player_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(response => response.json())
                //Return only the cards
        .then(json => {return json.cards})
        .catch(error => {
            console.log(error);
            return false;
        })
}