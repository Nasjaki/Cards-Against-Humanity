import get_games from "./get_games";



export default async function is_owner(player_id = window.player_id) {

    const game_stat = await get_games(window.game_id);

    return game_stat.owner.id == player_id;

}