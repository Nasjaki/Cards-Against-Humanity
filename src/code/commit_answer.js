
const url = "https://gruppe5.toni-barth.com/";

//Sending the answers to the server

export default async function commit_answer(white_cards, game_id = window.game_id, player_id = window.player_id) {

    //dont send if nothing is in the array
    if (white_cards.length === 0) return false;

    //dont send if the array is corrupted by an undefined answer
    for(var i = 0; i < white_cards.length; i++) {
        if (white_cards[i] == undefined) return false;
    }

    //Send through fetching
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
        //Return if response is okay -> true
        return (response.ok);
    })
    .catch(error => {
        //Else log error
        console.log(error);
        return false;
    })
    
}