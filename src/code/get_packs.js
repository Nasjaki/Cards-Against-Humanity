

const url = "https://gruppe5.toni-barth.com/";

//Gets all packs and the information about it

export default async function get_packs() {

    //Fetch GET request
    return await fetch(url + "packs/", {    
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {return json})
    .catch(error => {
        console.log(error);
        return false;
    });
}