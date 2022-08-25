
const url = "https://gruppe5.toni-barth.com/";

export default async function create_player(name_str) {

    try {
        //Fetch Funktion um Namen auf URL hochzuladen
        let response = await fetch(url + "players/", {
            
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "name" : name_str
            })
        });
        
        //Your id
        let json = await response.json();
        window.player_id = json.id;

        //let json = await response.json();
        console.log("Created: " + name_str);

        return true;
    } catch (ex) {
        console.error(ex);
    }
}