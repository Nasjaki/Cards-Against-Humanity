
import React from 'react';

import { useState } from 'react';

import get_packs from '../code/get_packs';
import get_white_cards_pack from '../code/get_white_cards_pack';
import get_black_cards_pack from '../code/get_black_cards_pack';


export default function Cards (){

    const[packs, set_packs] = useState([]);

    const[white_cards, set_white_cards] = useState([]);
    const[black_cards, set_black_cards] = useState([]);

    const[toggle_show_packs, set_toggle_show_packs] = useState("None");

    async function show_packs_handle() {
        if (toggle_show_packs == "Packs") {
            set_toggle_show_packs("None");
        } else {
            set_toggle_show_packs("Packs");
        }

        let packs_arr = await get_packs();

        set_packs(packs_arr.packs);

    }

    

    async function white_black_cards_handle(pack_id) {
        set_toggle_show_packs("Cards");

        let white_arr = await get_white_cards_pack(pack_id);
        let black_arr = await get_black_cards_pack(pack_id);

        set_white_cards(white_arr);
        set_black_cards(black_arr);

    }

    return <div>
        <h1>Cards</h1>

        

        <button onClick={() => show_packs_handle()}> Packs </button>

        {toggle_show_packs == "Packs" ? <div>
            {packs.map((pack) => {
                return (
                    <div>
                        <li key = {pack.id}>
                            <button onClick={() => white_black_cards_handle(pack.id)}> {pack.name} </button>
                        </li>
                    </div>
                )
            })}
        </div> : null}
        
        {toggle_show_packs == "Cards" ? <div>
            {white_cards.map((white_card) => {
                return (
                    <div>
                        <li key = {white_card.id}>
                            <button> {white_card.text} </button>
                        </li>
                    </div>
                )
            })}

            {black_cards.map((black_card) => {
                return (
                    <div>
                        <li key = {black_card.id}>
                            <button> {black_card.text} </button>
                        </li>
                    </div>
                )
            })}
            
       </div> : null}
    </div>
}