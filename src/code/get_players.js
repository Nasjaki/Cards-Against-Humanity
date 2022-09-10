

const url = "https://gruppe5.toni-barth.com/";

export default async function get_players(player_id = -1) {


    return await fetch(url + "players/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {

        if (player_id !== -1) {
            for(var i in json) {
                if(json[i].id == player_id) return json[i];
            }
        }
        return json
    });
    
    
}