
const url = "https://gruppe5.toni-barth.com/";

export default async function get_answers(game_id = window.game_id, player_id = window.player_id) {
    
    return await fetch(url + "games/" + game_id  + "/offers/" + player_id, {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {
        let offers = json.offers;

        let filtered_offers = [];
        let count = 0;
        for(var i = 0; i < offers.length; i++) {
            //filter out empty entries
            if (offers[i].length !== 0) {
                filtered_offers[count] = offers[i];
                count++;
            }
        }
        return filtered_offers;
    })
    .catch(error => {
        console.log(error);
        return false;
    })


    
}