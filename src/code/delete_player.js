import get_players from "./get_players";

const url = "https://gruppe5.toni-barth.com/";

//Delete all players -> Debug function only

export default async function delete_player(id = -1) {

    const delete_array = [];
    if (id == -1) {
        let p_json = await get_players();
        p_json = p_json.players;

        for(var i in p_json){
            //add all to delete list
            if(p_json[i] instanceof Object){
                delete_array[i] = p_json[i].id;
            }
        } 

    } else {
        //delete list = id
        delete_array[0] = id;
    }
    for(var i in delete_array){
        let player_id = delete_array[i];

        await fetch(url + "players/" + player_id, {
            method: 'DELETE',
        });
        console.log("deleted id: " + player_id);
    }
    
}