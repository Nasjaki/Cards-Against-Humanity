
import React from 'react';

import { useState } from 'react';

import get_packs from '../code/get_packs';


export default function Cards (){

    const[packs, set_packs] = useState([]);

    async function get_packs_handle() {
        let packs_arr = await get_packs();

        
        console.log(packs_arr.packs);
        set_packs(packs_arr.packs);
    }

    return <div>
        <h1>Cards</h1>

        

        <button onClick={get_packs_handle}> Refresh </button>

        {packs.map((pack) => {
            return (
                <div>
                    <li key = {pack.id}>
                        <button onClick = {get_packs_handle}> {pack.name} </button>
                    </li>
                </div>
            )
        })}
       
    </div>
}