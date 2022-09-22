
const url = "https://gruppe5.toni-barth.com/";

//Get the infos of the currrent game or of any given game_id
                                        //With the type of the information
export default async function get_game_info(type, game_id = window.game_id) {

    if (game_id == -1) return false;

    //Fetch request for the game data
    return await fetch(url + "games/" + game_id, {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {

        let info = "";
        //Switch what the player needs as information
        switch(type){
            case("General"):
                info = json;
            break;
            case("Czar"):
                info = json.czar;
            break;
            case("BlackCard"):
                info = json.currentBlackCard;
            break;
            case("Points"):
                info = json.points;
            break;
            case("WaitingFor"):
                info = json.waitingForPlayers;
            break;
        }
        
        return info;

    })
    .catch(error => {
        console.log(error)
        return false;
    })

}