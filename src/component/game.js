
import React from 'react';
import "../App.css";

import game_leave from '../code/game_leave';

import game_start from '../code/game_start';
import game_stop from '../code/game_stop';
import game_active from '../code/game_active';
import get_game_info from '../code/get_game_info';
import get_white_cards from '../code/get_white_cards';
import get_players_lobby from '../code/get_players_lobby'
import commit_answer from '../code/commit_answer';
import get_answers from '../code/get_answers';
import put_winner from '../code/put_winner';
import get_games from '../code/get_games';
import is_owner from '../code/is_owner';


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";





let black_card = "";
let card_count = 10;
let white_card = [];
for(var i = 0; i < card_count; i++) {
    white_card[i] = "";
}

let score_arr = [];
let card_selected = [];
let selected_allowed = 0;

let can_commit = true;

let player_is_owner = false;


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
    const [isCzar, setIsCzar] = useState("");

    //Load new Players
    const[player_list, set_player_list] = useState([]);

    const delete_list_element_end = () => {
        set_player_list(existing_players => {
            return existing_players.slice(0, existing_players.length-1);
        })
    }
    const set_list_element = (key, new_element) => {
        set_player_list(existing_players => {
            return [
                                        //0 -> at the beginning
                ...existing_players.slice(0,key),
                existing_players[key] = new_element,
                ...existing_players.slice(key + 1)
            ]
        })
    }


    async function refresh_player_list(player_arr) {


        if (player_arr.length !== player_list.length) {

            for(var i = 0; i < player_arr.length; i++) {
                set_list_element(i, player_arr[i].name + " " + player_arr[i].id);
            }
            if (player_arr.length < player_list.length) delete_list_element_end(); 
        }

    }

    //Answer List
    const[answer_list, set_answer_list] = useState([]);

    const set_answer_list_element = (index, new_element) => {
        set_answer_list(existing_answers => {
            return [
                ...existing_answers.slice(0,index),
                existing_answers[index] = new_element,
                ...existing_answers.slice(index + 1)
            ]
        })
    }

    async function refresh_answer_list() {

        const answer_arr = await get_answers();

        if (answer_list.length !== answer_arr.length) {
            
            //add answers
            for(var i = 0; i < answer_arr.length; i++) {
                let answer_array_parts = answer_arr[i];
                
                let answer_str = "";
                for(var i = 0; i < answer_array_parts.length; i++) {

                    answer_str += answer_array_parts[i].text + " ";
                    
                }
                
                set_answer_list_element(i, answer_str);

            }

        }

    }

    //Refresh the score
    async function refresh_score(points) {
        score_arr = points;
    }

    //Commit answer
    async function commitAnswerHandle() {
        let cards = card_selected;

        let answer_array = [];
        let pos = 0;

        
        for(var i = 0; i < cards.length; i++) {
            answer_array[pos] = white_card[cards[i]].id;
            pos++;
        }
        
        
        if (await commit_answer(answer_array) === true){
            //Reset card selected
            set_card_selected([]);
            set_answer_selected([]);

            for(var i = 0; i < cards.length; i++) {
                delete_white_card(i);
            }

            //disable abillity to commit an answer
            can_commit = false;
        } 
        

    }

    //mount
    useEffect(() => {
        setTimeout(async () => {
            player_is_owner = await is_owner();
        }, []); 
    });

    ///////////////////////////////////////////////////step//////////////////////////////////////////
    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout(async () => {
            setCount(count + 1);

            //current game stats
            let game_stats = await get_games(window.game_id);
            
            
            //only in game active possible
            if (game_stats.running == true) {
                //Display active
                setGameActive("Aktiv");

                let currInfo = await get_game_info("General");

                //Current Black Card
                black_card = currInfo.currentBlackCard;

                //Refresh score
                refresh_score(currInfo.points);

                //Game Loop as czar or as player
                let czar = currInfo.czar;
                if (czar.id === window.player_id) {
                    setIsCzar("Czar");
                    
                    //all 4 secs
                    if (count % 2 == 0) await refresh_answer_list();

                } else {
                    
                    if (isCzar != "Player") {
                        setIsCzar("Player");

                        can_commit = true;
                    }

                    
                    //set white cards array
                    refresh_white_cards();
                    
                    //get how many cards can be selected
                    selected_allowed = await get_game_info("BlackCard");
                    selected_allowed = selected_allowed.pick;
                    
                }

            } else {
                //Display not active
                setGameActive();

                black_card = "";
                setIsCzar("");


                //all 4 secs
                if (count % 2 == 0) await refresh_player_list(game_stats.players);

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


    //Answer selected
    const[answer_selected, set_answer_selected] = useState(-1);

    //white cards 
    const[white_card_list, set_white_card_list] = useState([]);
    

    //set white card
    const set_white_card = (index, new_card) => {
        set_white_card_list(existing_cards => {
            return [
                ...existing_cards.slice(0,index),
                existing_cards[index] = new_card,
                ...existing_cards.slice(index + 1)
            ]
        })
    }

    const delete_white_card = (index) => {
        set_white_card_list(existing_cards => {
            return existing_cards.slice(0, index);
        })
    }

    async function refresh_white_cards() {
        white_card = await get_white_cards();
        
        if (white_card.length > white_card_list.length) {
            for(var i = 0; i < white_card.length; i++) {
                set_white_card(i,white_card[i].text);
            }
        } else if (white_card.length != white_card_list.length){
            console.log("white card didnt get deleted from list");
        }
        
    }

    //Selected white cards 
    const[card_selected, set_card_selected] = useState([-1]);

    function card_selected_handle(index) {


        for(var i = 0; i < card_selected.length; i++) {
            if (card_selected[i] == index) {
                return true;
            }
        }

        return false;
        
    }
    function set_card_selected_handle(index) {
        let array_modify = card_selected;
        let pos = 0;
        for(var i = 0; i < selected_allowed - 1; i++) {
            if (array_modify.length > i) {
                array_modify[i] = array_modify[i+1];
                pos++;
            }
        }
        array_modify[pos] = index;
        set_card_selected(array_modify);

    }

    //Winner
    async function winner_handle() {
        let answers_test = await get_answers();

        
        let winner_arr = answers_test[answer_selected];
        let id_arr = [];
        for(var i = 0; i < winner_arr.length; i++) {
            id_arr[i] = winner_arr[i].id;
        }

        if (await put_winner(id_arr)){
            //Reset answer selected
            set_answer_selected(-1);
            //Reset answer list
            set_answer_list([]);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return <div>
        <h1>Game {game_active}</h1>
        <h2>{window.game_id}</h2>


        {player_is_owner ? <div>
            {game_active !== "Aktiv" ? <button className='Game-Buttons' id = "Start-Game-Button" onClick={toggleGameHandle}> Start Game </button> :
            <button className='Game-Buttons ' id = "Stop-Game-Button" onClick={toggleGameHandle}> Stop Game </button>}
        </div> : null}
        
        <button className='Game-Buttons ' id = "Leave-Game-Button" onClick={leaveGameHandle}> Leave Game </button>
       

        <h3>{isCzar}</h3>

        <div className='Cards'>
            <div className='Black-Card'>
                <input id = "black_card" placeholder= {black_card.text}></input>
            </div>

            {isCzar === "Player"  ? <div>
                <ul className='White-Cards-Table'>
                    {white_card_list.map((card_text, index) => {
                        return (
                            <li key = {index}>
                                <div className='Card-Parent'>
                                    <button id = "Choose-Card-Button" onClick={() => set_card_selected_handle(index)}> {card_text} </button>
                                    <div>
                                        {/*<button className='Card-Selection' id = {card_selected_handle(index)  ? "Card_Selected" : "Card_Default"} onClick = {() => set_card_selected_handle(index)}>o</button> */}
                                        <button className='Card-Selection' id = {card_selected_handle(index)  ? "Card_Selected" : "Card_Default"} onClick = {() => set_card_selected_handle(index)}>o</button>
                                    </div>
                                </div>

                            </li>
                        )
                    })}
                </ul> 

                {can_commit ? <button className='Game-Buttons' id = "Commit-Answer-Button" onClick = {commitAnswerHandle}> Commit Answer </button> : null}
            </div> : null}

            
        </div>

        <ul className='Player-Table'>
            {player_list.map((player_name, index) => {
                return (
                    <li key = {index}>
                        <span>{player_name}</span> <span> {score_arr[index]}</span>
                    </li>
                    
                )
            })}
        </ul>

        {isCzar === "Czar" ? <div className='Czar-Table'>
            <ul className='Answer-Table'>
                {answer_list.map((answer_text, index) => {
                    return (
                        <div>
                            <li key = {index}>
                                <div className='Card-Parent'>
                                    <button id = "Choose-Answer-Button" onClick={() => set_answer_selected(index) }> {answer_text} </button>
                                    <div>
                                        <button className='Card-Selection' id = {answer_selected === index ? "Answer_Selected" : "Answer_Default"} onClick = {() => set_answer_selected(index)}>o</button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                })}
            </ul> 

            <button className='Game-Buttons' id = "Select-Winner-Button" onClick={() => winner_handle()}> Winner </button>

        </div> : null}
        
    </div>
}

//<button id = "Black-Card-Button" onClick={newBlackCardHandle}> New Black Card </button>


