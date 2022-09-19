
const url = "https://gruppe5.toni-barth.com/";

export default async function commit_answer(white_cards, game_id = window.game_id, player_id = window.player_id) {

    if (white_cards.length === 0) return false;

    for(var i = 0; i < white_cards.length; i++) {
        if (white_cards[i] == undefined) return false;
    }

    console.log(white_cards);

    return await fetch(url + "games/" + game_id + "/cards/" + player_id, { 
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "cards" : white_cards
                
        })
    })
    .then(response => {
        return (response.ok);
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    
}