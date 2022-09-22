import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";

//check if game ist waiting for players

export default async function get_game_waiting() {

    let all_games = await get_games();

    //if the game is not running then its waiting backwards, so newest get filled first
    for(var i = all_games.length; i > 0 ; i--) {
        if (!all_games[i - 1].running) return all_games[i - 1].id;
    }

    return false;
}