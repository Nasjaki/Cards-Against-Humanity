import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";

export default async function get_players_lobby(game_id = window.game_id) {
    let games = await get_games();

    for(var i in games) {

        if (game_id == games[i].id) {
            return games[i].players;
        }
    }
    return false;
}