
const url = "https://gruppe5.toni-barth.com/";

export default async function get_game_info(type, game_id = window.game_id) {

    try {
        let response = await fetch(url + "games/" + game_id, {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();

        let info = "Error";
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
        
    } catch (ex) {
        console.error(ex);
        return false;
    }
}