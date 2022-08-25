

const url = "https://gruppe5.toni-barth.com/";

export default async function get_players() {
    let response = await fetch(url + "players/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
    let json = await response.json();
    return json;
}