
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

    //show or hide packs or return to packs
    async function show_packs_handle() {

        if (toggle_show_packs == "Packs") {
            set_toggle_show_packs("None");
        } else {
            set_toggle_show_packs("Packs");
        }

        let packs_arr = await get_packs();

        set_packs(packs_arr.packs);

    }

    
    //load white and black cards on demand
    async function white_black_cards_handle(pack_id) {
        set_toggle_show_packs("Cards");

        let white_arr = await get_white_cards_pack(pack_id);
        let black_arr = await get_black_cards_pack(pack_id);

        set_white_cards(white_arr);
        set_black_cards(black_arr);

    }

    return <div>
        <h1>Cards</h1>

        

        <button className='Game-Buttons Button-Block' id="Toggle-Packs-Button" onClick={() => show_packs_handle()}> Packs </button>

        {toggle_show_packs == "Packs" ? <div className='Card-Packs-Table'>
            {packs.map((pack, index) => {
                return (
                    <div className='Card-Packs'>
                        <li key = {index}>
                        <button className='Card-Packs-Button' onClick={() => white_black_cards_handle(pack.id)}> {pack.name} </button>
                            <button className='Card-Packs-Button ' id='Pack-1'></button>
                            <button className='Card-Packs-Button' id='Pack-2'></button>
                        </li>
                    </div>
                )
            })}
        </div> : null}

        {toggle_show_packs == "Cards" ? <div>
            {black_cards.map((black_card, index) => {
                return (
                    <div className='Card-Packs'>
                        <li key = {index}>
                            <button className='Black-Card-Pack Card-Pack'> {
                                <div className='Card-Packs-Text'>
                                    {black_card.text}
                                </div>} 
                            </button>
                        </li>
                    </div>
                )
            })}

            {white_cards.map((white_card, index) => {
                return (
                    <div className='Card-Packs'>
                        <li key = {index}>
                            <button className='White-Card-Pack Card-Pack'> {
                                <div className='Card-Packs-Text'>
                                    {white_card.text}
                                </div>} 
                            </button>
                        </li>
                    </div>
                )
            })}

       </div> : null}
    </div>
}