
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
for(var i = 0; i < card_count; i++) {
    white_card[i] = "";
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

                    white_card = await get_white_cards();
                    setShowCount(10);
                }

            } else {
                //Display not active
                setGameActive();

                black_card = "";
                setIsCzar("");
            }
            


          }, 2000);
    });

    //wie viele weiße Karten gezeigt werden
    const [showCount, setShowCount] = useState(-1);

    let navigate = useNavigate();
    async function leaveGameHandle() {
        let left = await game_leave();
    
        if (left) {
            navigate("/");
        } 
    }

    return <div>
        <h1>Game {game_active}</h1>
        <h2>{window.game_id}</h2>

        {game_active !== "Aktiv" ? <button id = "Start-Game-Button" onClick={toggleGameHandle}> Start Game </button> : 
        <button id = "Stop-Game-Button" onClick={toggleGameHandle}> Stop Game </button>}
        <button id = "Leave-Game-Button" onClick={leaveGameHandle}> Leave Game </button>
       

        <h3>{isCzar}</h3>

        <div className='Cards'>
            <div className='Black-Card'>
                <input id = "black_card" placeholder= {black_card}></input>
            </div>

            <div className='White-Card'>
                {showCount > 0 ? <button id = "white_card0" >{white_card[0].text}</button> : null}
                {showCount > 1 ? <button id = "white_card1" >{white_card[1].text}</button> : null}
                {showCount > 2 ? <button id = "white_card2" >{white_card[2].text}</button> : null}
                {showCount > 3 ? <button id = "white_card3" >{white_card[3].text}</button> : null}
                {showCount > 4 ? <button id = "white_card4" >{white_card[4].text}</button> : null}
                {showCount > 5 ? <button id = "white_card5" >{white_card[5].text}</button> : null}
                {showCount > 6 ? <button id = "white_card3" >{white_card[6].text}</button> : null}
                {showCount > 7 ? <button id = "white_card4" >{white_card[7].text}</button> : null}
                {showCount > 8 ? <button id = "white_card5" >{white_card[8].text}</button> : null}
                {showCount > 9 ? <button id = "white_card5" >{white_card[9].text}</button> : null}
            </div>
        </div>
        
    </div>
}

//<button id = "Black-Card-Button" onClick={newBlackCardHandle}> New Black Card </button>

//<button id = "White-Card-Button" onClick={newWhiteCardHandle}> New White Card </button>

