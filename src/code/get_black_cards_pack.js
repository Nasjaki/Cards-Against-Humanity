
const url = "https://gruppe5.toni-barth.com/";

export default async function get_black_cards_pack(pack_id) {
    return await fetch(url + "packs/" + pack_id, {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {return json.black})
    .catch(error => {
        console.log(error);
        return false;
    });
}