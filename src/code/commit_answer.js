
const url = "https://gruppe5.toni-barth.com/";

export default async function commit_answer(white_cards, game_id = window.game_id, player_id = window.player_id) {

    if (white_cards.length === 0) return false;

    console.log(white_cards)

    try {
        let response = await fetch(url + "games/" + game_id + "/cards/" + player_id, {
            
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "cards" : white_cards
                
            })
        });
        
        console.log("answer committed");

        return true;
    } catch (ex) {
        console.error(ex);
    }
    
}