import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";

//Looks if a game with the given id exists

export default async function game_exists(game_id) {
    //gets all games
    let games = await get_games();

    //only the given id
    for(var i in games) {
        if (game_id === games[i].id) {
            return true;
        }
    }
    return false;
}