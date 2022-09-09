
const url = "https://gruppe5.toni-barth.com/";

export default async function get_games(game_id = -1) {


    try {
        let response = await fetch(url + "games/", {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();

        if (game_id !== -1) { 
            for(var i in json.games) {
                if (game_id === json.games[i].id) {
                    console.log(game_id + " info");
                    return json.games[i];
                }
            }
        }

        //default
        return json.games 
    } catch (ex) {
        console.error(ex);
        return false;
    }
}