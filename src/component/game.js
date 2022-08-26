
import React from 'react';
import "../App.css";

import game_leave from '../code/game_leave';

import game_start from '../code/game_start';
import game_stop from '../code/game_stop';
import game_active from '../code/game_active';
import get_black_card from '../code/get_black_card';
import get_white_cards from '../code/get_white_cards';
import get_czar from '../code/get_czar';


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let black_card = "";
let card_count = 10;
let white_card = [];
let selected = [];
let selected_allowed = 0;
for(var i = 0; i < card_count; i++) {
    white_card[i] = "";
    selected[i] = false;
}


async function gameActiveHandle() {
    return await game_active();
}


export default function Game (){

    //Spiel Aktiv
    const [game_active, setGameActive] = useState("");
    async function toggleGameHandle() {
        if (game_active !== "Aktiv") {
            let started = await game_start();
        } else {
            let stopped = await game_stop();
        }
    }
    //is Czar
    const [isCzar, setIsCzar] = useState("Player");

    //step
    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout(async () => {
            setCount((count) => count + 1);
            

            //only in game active possible
            if (await gameActiveHandle()) {
                //Display active
                setGameActive("Aktiv");
                //Current Black Card
                black_card = await get_black_card();

                //Game Loop as czar or as player
                if (await get_czar() === "Czar") {
                    setIsCzar("Czar");
                    

                } else {
                    setIsCzar("Player");

                    //set white cards array
                    white_card = await get_white_cards();
                    //get how many cards can be selected
                    selected_allowed = await get_black_card();
                    selected_allowed = selected_allowed.pick;
                }

            } else {
                //Display not active
                setGameActive();

                black_card = "";
                setIsCzar("");
            }
            


          }, 2000);
    });

    let navigate = useNavigate();
    async function leaveGameHandle() {
        let left = await game_leave();
    
        if (left) {
            navigate("/");
        } 
    }

    //Cards selected
    function toggleSelected(card) {
        let selected_count = 0;
        for(var i = 0; i < selected.length; i++) {
            if (selected[i] === true) selected_count++;
        }

        if (selected[card] === false && selected_count >= selected_allowed) {
            
        } else {
            selected[card] = !(selected[card]);
        }
    }
    function selectedHandle(card) {
        return selected[card];
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return <div>
        <h1>Game {game_active}</h1>
        <h2>{window.game_id}</h2>

        {game_active !== "Aktiv" ? <button id = "Start-Game-Button" onClick={toggleGameHandle}> Start Game </button> : 
        <button id = "Stop-Game-Button" onClick={toggleGameHandle}> Stop Game </button>}
        <button id = "Leave-Game-Button" onClick={leaveGameHandle}> Leave Game </button>
       

        <h3>{isCzar}</h3>

        <div className='Cards'>
            <div className='Black-Card'>
                <input id = "black_card" placeholder= {black_card.text}></input>
            </div>

            {isCzar === "Player" ? <div className='Player-Board'>
                <div className='White-Card'>
                    <button id = {selectedHandle(0) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(0)}>{white_card[0].text}</button>
                    <button id = {selectedHandle(1) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(1)}>{white_card[1].text}</button>
                    <button id = {selectedHandle(2) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(2)}>{white_card[2].text}</button>
                    <button id = {selectedHandle(3) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(3)}>{white_card[3].text}</button>
                    <button id = {selectedHandle(4) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(4)}>{white_card[4].text}</button>
                    <button id = {selectedHandle(5) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(5)}>{white_card[5].text}</button>
                    <button id = {selectedHandle(6) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(6)}>{white_card[6].text}</button>
                    <button id = {selectedHandle(7) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(7)}>{white_card[7].text}</button>
                    <button id = {selectedHandle(8) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(8)}>{white_card[8].text}</button>
                    <button id = {selectedHandle(9) ? "card_selected" : "card_default"} onClick = {() => toggleSelected(9)}>{white_card[9].text}</button>
                </div> 
                <button id = "Commit-Answer-Button"> Commit Answer </button>
            </div> : null}

            
        </div>
        
    </div>
}

//<button id = "Black-Card-Button" onClick={newBlackCardHandle}> New Black Card </button>


