
const url = "https://gruppe5.toni-barth.com/";

//Create game with owner id, packs and the needed points to win

export default async function create_game(owner_id = window.player_id, packs = 0, goal = 10) {

    //If the player did not login yet return false
    if (owner_id < 0) {
        return false;
    } 

    //Post the request to create a game
    return await fetch(url + "games/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "owner" : owner_id,
                //"packs" : [packs],
                "goal" : goal
            })
    })
    //translate fetch file to json file
    .then(response => response.json())
    .then(json => {
        //Set the local game_id to the server game_id
        window.game_id = json.id;
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    
}