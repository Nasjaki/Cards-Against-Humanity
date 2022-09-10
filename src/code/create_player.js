
const url = "https://gruppe5.toni-barth.com/";

export default async function create_player(name_str) {

    //Fetch Funktion um Namen auf URL hochzuladen
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
        window.player_id = json.id;
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    });
}