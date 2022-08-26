
const url = "https://gruppe5.toni-barth.com/";

export default async function get_black_card(game_id = window.game_id) {
    try {
        let response = await fetch(url + "games/" + game_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();
        let card = json.currentBlackCard;

        return card;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}