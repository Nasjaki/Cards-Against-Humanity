

const url = "https://gruppe5.toni-barth.com/";

export default async function get_packs() {
    let response = await fetch(url + "packs/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
    let json = await response.json();
    return json;
}