
const url = "https://gruppe5.toni-barth.com/";

//Sets the winner of the round

export default async function put_winner(winner_cards, game_id = window.game_id, player_id = window.player_id) {

    //Check for error if the winner_cards array is empty
    if (winner_cards.length === 0) return false;

    //Fetch a request to put the winner
    return await fetch(url + "games/" + game_id + "/offers/" + player_id, {
            
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                //commit the winner_cards
                "cards" : winner_cards
                
            })
    })
        //if response is okay return true
    .then(response => {return true})
    .catch(error => {
        console.log(error);
        return false;
    })
}