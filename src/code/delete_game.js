import get_games from "./get_games";


const url = "https://gruppe5.toni-barth.com/";

export default async function delete_game(id = -1) {

    const delete_array = [];
    if (id == -1) {
        let g_json = await get_games();
        g_json = g_json;

        for(var i in g_json){
            //add all to delete list
            if(g_json[i] instanceof Object){
                delete_array[i] = g_json[i].id;
            }
        } 

    } else {
        //delete list = id
        delete_array[0] = id;
    }
    for(var i in delete_array){
        let game_id = delete_array[i];

        await fetch(url + "games/" + game_id, {
            method: 'DELETE',
        });
        console.log("deleted id: " + game_id);
    }
    
}