import get_games from "./get_games";

//Check if the given player is the owner
                                        //By default the local player
export default async function is_owner(player_id = window.player_id) {

    //Check if logged in
    if (player_id !== -1) {
                        //Return the game_stats
        const game_stat = await get_games(window.game_id);

        return game_stat.owner.id == player_id;
    }

}