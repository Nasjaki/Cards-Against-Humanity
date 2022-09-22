import get_games from "./get_games";

const url = "https://gruppe5.toni-barth.com/";


//Check if the game with the given id is active

export default async function game_active(game_id = window.game_id) {
    
    //gets all games
    let games = await get_games();

    //looks for the given game
    for(var i in games) {
        if (game_id == games[i].id) {
            return (games[i].running);
        }
    }
    return false;
}