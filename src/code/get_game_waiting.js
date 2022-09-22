import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";

//check if game ist waiting for players

export default async function get_game_waiting() {

    let all_games = await get_games();

    //if the game is not running then its waiting
    for(var i in all_games) {
        if (!all_games[i].running) return all_games[i].id;
    }

    return false;
}