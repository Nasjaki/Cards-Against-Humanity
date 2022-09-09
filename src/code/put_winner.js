
const url = "https://gruppe5.toni-barth.com/";

export default async function put_winner(winner_cards, game_id = window.game_id, player_id = window.player_id) {

    if (winner_cards.length === 0) return false;

    console.log(winner_cards)

    try {
        let response = await fetch(url + "games/" + game_id + "/offers/" + player_id, {
            
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "cards" : winner_cards
                
            })
        });
        
        console.log("Winner crowned");

        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
    
}