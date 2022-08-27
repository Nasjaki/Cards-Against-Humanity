
const url = "https://gruppe5.toni-barth.com/";

export default async function get_answers(game_id = window.game_id, player_id = window.player_id) {
    try {
        let response = await fetch(url + "games/" + game_id  + "/offers/" + player_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();

        let offers = json.offers;


        let filtered_offers = [];
        let count = 0;
        for(var i = 0; i < offers.length; i++) {
            if (offers[i].length !== 0) {
                filtered_offers[count] = offers[i];
                count++;
            }
        }

        return filtered_offers;
        
    } catch (ex) {
        console.error(ex);
        return false;
    }
}