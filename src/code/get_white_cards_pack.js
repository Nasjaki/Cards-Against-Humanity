
const url = "https://gruppe5.toni-barth.com/";

//Get all the white cards in a pack

export default async function get_white_cards_pack(pack_id) {

    //Fetch a request for a pack 
    return await fetch(url + "packs/" + pack_id, {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
                        //Return all information about the white cards
    .then(json => {return json.white})
    .catch(error => {
        console.log(error);
        return false;
    });
}