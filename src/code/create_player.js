
const url = "https://gruppe5.toni-barth.com/";

//Fetch function to create a new player with the name as string

export default async function create_player(name_str) {

    return await fetch(url + "players/", {
            
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "name" : name_str
        })
    })
    .then(response => response.json())
    .then(json => {
        //set local player id to the id given by the server
        window.player_id = json.id;
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    });
}