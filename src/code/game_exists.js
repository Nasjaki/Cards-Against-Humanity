import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";

export default async function game_exists(game_id) {
    let games = await get_games();

    for(var i in games) {
        if (game_id === games[i].id) {
            return true;
        }
    }
    return false;
}