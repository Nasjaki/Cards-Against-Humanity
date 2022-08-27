
const url = "https://gruppe5.toni-barth.com/";

export default async function get_games() {
    try {
        let response = await fetch(url + "games/", {    
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        });
        let json = await response.json();
        return json.games;
    } catch (ex) {
        console.error(ex);
        return false;
    }
}