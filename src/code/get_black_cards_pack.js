
const url = "https://gruppe5.toni-barth.com/";

//Get all black card from the current pack

export default async function get_black_cards_pack(pack_id) {

    //Fetch a request to get the cards of a pack
    return await fetch(url + "packs/" + pack_id, {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
                        //only return the black cards
    .then(json => {return json.black})
    .catch(error => {
        console.log(error);
        return false;
    });
}