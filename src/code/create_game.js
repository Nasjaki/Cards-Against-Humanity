
const url = "https://gruppe5.toni-barth.com/";

export default async function create_game(owner_id, packs = 0, goal = 10) {
    if (owner_id < 0) {
        //first login
        return false;
    } 

    return await fetch(url + "games/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "owner" : owner_id//,
                //"packs" : [packs],
                //"goal" : goal
            })
    })
    .then(response => response.json())
    .then(json => {
        window.game_id = json.id;
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    
}