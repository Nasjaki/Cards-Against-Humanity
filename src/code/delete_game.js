import get_games from "./get_games";
import game_stop from "./game_stop";


const url = "https://gruppe5.toni-barth.com/";

export default async function delete_game(id = -1) {


    let g_json = await get_games();
    for(var i in g_json){

        await game_stop(g_json[i].id, g_json[i].owner.id);

        await fetch(url + "games/" + g_json[i].id, {
            method: 'DELETE',
        });
        console.log("deleted id: " + g_json[i].id);
    } 

    
}