
const url = "https://gruppe5.toni-barth.com/";

export default async function put_winner(winner_cards, game_id = window.game_id, player_id = window.player_id) {

    if (winner_cards.length === 0) return false;

    return await fetch(url + "games/" + game_id + "/offers/" + player_id, {
            
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "cards" : winner_cards
                
            })
    })
    .then(response => {return true})
    .catch(error => {
        console.log(error);
        return false;
    })
}