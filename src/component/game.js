
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

    //Selected white cards 
    const[card_selected, set_card_selected] = useState([-1]);

    function card_selected_handle(index) {

        for(var i = 0; i < card_selected.length; i++) {
            if (card_selected[i] == index) {
                return i + 1;
            }
        }

        return -1;
        
    }
    function set_card_selected_handle(index) {

        //if index not already in array continue 
        for(var i = 0; i < card_selected.length; i++) {
            //End function
            if (card_selected[i] === index) return false;
        }
        

        let array_modify = card_selected;


        let pos = 0;
        for(var i = 0; i < selected_allowed - 1; i++) {
            
            array_modify[i] = array_modify[i+1];
            pos++;
            
        }
        

        //The last one is the new one
        array_modify[pos] = index;


        set_card_selected(array_modify);

        
    }


    //Answer List
    const[answer_list, set_answer_list] = useState([]);

    async function refresh_answer_list() {

        let answer_arr = await get_answers();

        let compiled_answer = [];

        for(var i = 0; i < answer_arr.length; i++) {
            let answer_str = "";
  
            for(var i2 = 0; i2 < answer_arr[i].length; i2++) {
                answer_str += answer_arr[i][i2].text + "\n";
            }
            compiled_answer[i] = answer_str;

        }

        set_answer_list(compiled_answer);

    }

    //Refresh the score
    async function refresh_score(points) {

        score_arr = points;
    }

    //Commit answer
    async function commitAnswerHandle() {
        let cards = card_selected;
        set_card_selected([]);

        let answer_array = [];
        let pos = 0;

        
        for(var i = 0; i < cards.length; i++) {
            //dont commit if not valid
            if (cards[i] == -1 || cards.length < selected_allowed || cards[i] == undefined) {
                return false;
            } 

            answer_array[pos] = white_card[cards[i]].id;
            pos++;
        }

        
        if (await commit_answer(answer_array) === true){

            //Reset card selected
            set_card_selected([]);
            set_answer_selected([]);

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
    const [winner, set_winner] = useState("none");

    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout(async () => {
            setCount(count + 1);

            //current game stats
            let game_stats = await get_games(window.game_id);


            //only in game active possible
            if (game_stats.running == true) {
                //Hide crown
                set_winner("none");

                //Display active
                setGameActive("Aktiv");

                let currInfo = await get_game_info("General");


                //new black card -> new round
                if (black_card.text !== currInfo.currentBlackCard.text) {
                    //Current Black Card 
                    black_card = currInfo.currentBlackCard;
                    can_commit = true;
                } 
                

                //Game Loop as czar or as player
                let czar = currInfo.czar;
                if (czar.id === window.player_id) {
                    setIsCzar("Czar");
                    
                    //all 4 secs
                    if (count % 2 == 0 && answer_list.length == 0) await refresh_answer_list();


                } else {
                    setIsCzar("Player");

                    
                    //set white cards array
                    if (count % 2 == 0) await refresh_white_cards();
                    
                    //get how many cards can be selected
                    selected_allowed = await get_game_info("BlackCard");
                    selected_allowed = selected_allowed.pick;
                    
                }


                //Refresh score
                refresh_score(currInfo.points);

            } else {
                //Display not active
                setGameActive("");

                setIsCzar("");
                black_card = "";

                

                
                let winner_stats = game_stats.winner;
                
                if(winner_stats != undefined) {
                    let winner_id = winner_stats.id;
                    if (winner_id !== -1) {
                        (winner_id === window.player_id) ? set_winner("winner") : set_winner("loser");

                    } else {
                        set_winner("none");
                    }
                }

                score_arr = [];


                //all 4 secs
                if (count % 2 == 0) await refresh_player_list(game_stats.players);

            }

            

          }, 2000);
    });

    async function refresh_player_list(player_arr) {

        if (player_arr == undefined || player_list == undefined) return false;

        if (player_arr.length !== player_list.length) {

            for(var i = 0; i < player_arr.length; i++) {
                set_list_element(i, player_arr[i].name + "_" + player_arr[i].id);
            }
            if (player_arr.length < player_list.length) delete_list_element_end(); 
        }

    }

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
    
    async function refresh_white_cards() {
        const white_card_arr = await get_white_cards();

        set_white_card_list(white_card_arr);

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
        <h2>Game {game_active + " id: " + window.game_id}</h2>


        {player_is_owner ? <div className='Game-Buttons-Alternate'>
            {game_active !== "Aktiv" ? <button className='Game-Buttons' id = "Start-Game-Button" onClick={toggleGameHandle}> Start Game </button> :
            <button className='Game-Buttons ' id = "Stop-Game-Button" onClick={toggleGameHandle}> Stop Game </button>}
        </div> : null}
        
        <button className='Game-Buttons ' id = "Leave-Game-Button" onClick={leaveGameHandle}> Leave Game </button>
       

        <h3>{isCzar}</h3>

        <div className='Cards'>
            {game_active == "Aktiv" ? <div className='Black-Card'>
                    {black_card.text}
            </div> : null}

            {isCzar === "Player"  ? <div className='White-Cards-Map'>
                <ul className='White-Cards-Table'>
                    {white_card_list.map((white_card,index) => {
                        return (
                            <li key = {index.toString()}>
                                <div className='Card-Parent'>
                                    {card_selected_handle(index) > -1 ? <button id = "Chosen-Card-Button" onClick={() => set_card_selected_handle(index)} > {white_card.text} <br></br> {card_selected_handle(index)} </button> : 
                                    <button id = "Choose-Card-Button" onClick={() => set_card_selected_handle(index)} > {white_card.text} </button> }
                                </div>
 
                            </li>
                        )
                    })}
                </ul> 

                {can_commit ? <button className='Game-Buttons' id = "Commit-Answer-Button" onClick = {commitAnswerHandle}> Commit Answer </button> : null}
            </div> : null}

        

            {isCzar === "Czar" ? <div className='Czar-Table'>
                <ul className='Answer-Table'>
                    {answer_list.map((white_card, index) => {
                        return (
                            <li key = {index.toString()}>
                                <div className='Card-Parent'>
                                    <button id = "Choose-Answer-Button" onClick={() => set_answer_selected(index) }> 
                                        <div className='white_answer_card'>
                                            <div id = "white_answer_list"> <p>{white_card}</p> </div> 
                                        </div>
                                    </button>
                                </div>
                            </li>
                    )
                    })}
                </ul> 

                <button className='Game-Buttons' id = "Select-Winner-Button" onClick={() => winner_handle()}> Winner </button>

            </div> : null}

        </div>

        {winner != "none" ? <div className='Crown-Container'>
            {winner == "winner" ? <svg className='Crown' width="118" height="91" viewBox="0 0 118 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M58.7489 4.4975C55.8179 4.4975 53.4414 7.52242 53.4414 11.2539C53.4414 14.3872 55.1222 17.0114 57.3948 17.7757L48.254 45.4468L34.9579 24.0515C35.9872 22.819 36.6348 21.0771 36.6348 19.1364C36.6348 15.4049 34.2591 12.38 31.3281 12.38C28.3969 12.38 26.0207 15.4049 26.0207 19.1364C26.0207 22.8678 28.3969 25.8928 31.3281 25.8928C31.484 25.8928 31.6368 25.8629 31.7885 25.8569L26.9788 51.4635L13.8672 39.6046C14.6392 38.4311 15.1108 36.9266 15.1108 35.2761C15.1108 31.5447 12.7353 28.5194 9.80404 28.5194C6.87308 28.5194 4.49658 31.5447 4.49658 35.2761C4.49658 39.0076 6.87308 42.0322 9.80404 42.0322C10.5973 42.0322 11.3487 41.8074 12.0248 41.4107L19.239 65.9735H98.1292L105.75 43.8156C106.353 44.1184 107.006 44.2848 107.694 44.2848C110.625 44.2848 113.001 41.2598 113.001 37.5284C113.001 33.7966 110.625 30.772 107.694 30.772C104.762 30.772 102.386 33.7966 102.386 37.5284C102.386 38.918 102.715 40.208 103.28 41.2819L92.3247 50.6426L86.6857 26.9245C89.2308 26.4262 91.1821 23.6413 91.1821 20.2621C91.1821 16.5304 88.8056 13.5054 85.8747 13.5054C82.9434 13.5054 80.5672 16.5304 80.5672 20.2621C80.5672 22.3221 81.2954 24.1607 82.4374 25.4001L70.3951 45.1767L60.6557 17.5528C62.6419 16.5757 64.0556 14.1269 64.0556 11.2535C64.0556 7.52205 61.6794 4.4975 58.7482 4.4975H58.7489ZM19.4798 64.2955V76.3864L97.9777 76.1917V64.8317L19.4798 64.2955ZM19.7463 74.4303L18.9433 86.3257H97.963L98.0355 74.8354L19.7463 74.4303Z" fill="#FCCE00" stroke="#F5981B" strokeWidth="8.99435"/>
                <path d="M58.7496 4.4975C55.8184 4.4975 53.4422 7.52248 53.4422 11.254C53.4422 14.3874 55.1223 17.0116 57.395 17.7758L48.2546 45.4468L34.9587 24.0514C35.9877 22.8191 36.6356 21.077 36.6356 19.1364C36.6356 15.405 34.2595 12.38 31.3284 12.38C28.3972 12.38 26.021 15.405 26.021 19.1364C26.021 22.8679 28.3972 25.8929 31.3284 25.8929C31.4837 25.8929 31.6371 25.8746 31.7891 25.8575L26.9794 51.464L13.8678 39.6049C14.6398 38.4316 15.1117 36.927 15.1117 35.2767C15.1117 31.5452 12.7355 28.5202 9.8044 28.5202C6.87327 28.5202 4.49707 31.5452 4.49707 35.2767C4.49707 39.0082 6.87327 42.0331 9.8044 42.0331C10.5978 42.0331 11.349 41.8087 12.025 41.4114L19.2396 65.9741H98.1298L105.75 43.8163C106.353 44.1192 107.007 44.2855 107.694 44.2855C110.625 44.2855 113.001 41.2605 113.001 37.5291C113.001 33.7976 110.625 30.7726 107.694 30.7726C104.763 30.7726 102.387 33.7976 102.387 37.5291C102.387 38.9189 102.715 40.2087 103.28 41.2827L92.325 50.6434L86.6859 26.9252C89.2309 26.4269 91.1825 23.642 91.1825 20.2626C91.1825 16.5312 88.8063 13.5062 85.8751 13.5062C82.944 13.5062 80.5679 16.5312 80.5679 20.2626C80.5679 22.3226 81.2964 24.1611 82.4384 25.4005L70.3955 45.1774L60.6563 17.5533C62.6426 16.5763 64.0562 14.1276 64.0562 11.2544C64.0562 7.52294 61.68 4.49796 58.7489 4.49796L58.7496 4.4975ZM19.4802 64.2956L18.9448 76.1909H97.9646V64.831L19.4802 64.2956ZM19.0303 74.7565L18.9448 86.3255H97.9646L97.8408 74.8352L19.0303 74.7565Z" fill="#FCCE00"/>
                <path d="M58.6302 4.45831C55.699 4.45831 53.3242 7.48433 53.3242 11.2158C53.3242 14.3494 55.005 16.969 57.2775 17.7332L48.1368 45.4072L34.8385 24.0105C35.8675 22.7783 36.5191 21.0379 36.5191 19.0976C36.5191 18.1714 36.3693 17.2897 36.1033 16.4859C33.0911 17.0463 29.7398 19.0018 26.4122 21.9493C27.2585 24.25 29.0805 25.855 31.208 25.855C31.3639 25.855 31.5186 25.8189 31.6706 25.8129L26.8631 51.4203L13.7463 39.5625C14.2425 38.8079 14.5972 37.9063 14.7996 36.9274C13.8531 38.6163 12.9321 40.3262 12.1235 42.1152L13.6109 47.169C21.6809 50.2643 27.7845 60.9198 32.9991 65.2866C38.8922 70.2209 47.2863 73.0874 55.5728 73.3791C63.8593 73.67 75.7901 69.3673 82.3341 65.2866C88.8622 61.2157 95.1632 47.4286 104.738 46.3727L104.774 46.2738C104.188 44.6899 103.518 43.1134 102.8 41.5538L92.2075 50.6008L86.5685 26.8856C88.3482 26.537 89.8214 25.0558 90.5562 23.0498C87.5605 19.8646 84.4958 17.4151 81.6263 16.0288C80.9019 17.1837 80.4493 18.6286 80.4493 20.2215C80.4493 22.2815 81.1811 24.1175 82.3231 25.3569L70.2779 45.1378L60.5399 17.5103C62.5262 16.5335 63.9362 14.0885 63.9362 11.2154C63.9362 7.48397 61.5619 4.45795 58.6309 4.45795L58.6302 4.45831Z" fill="#FEE140"/>
            </svg> : 

            <svg className='Crown' width="120" height="100" viewBox="0 0 206 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M98.0146 144.577C100.158 142.755 102.297 140.928 104.446 139.114C107.8 136.282 111.162 133.459 114.52 130.632C114.636 130.534 114.743 130.427 114.887 130.294C113.583 128.476 112.295 126.68 111.006 124.885C108.254 121.05 105.506 117.213 102.743 113.387C102.472 113.012 102.421 112.682 102.526 112.228C103.381 108.541 104.204 104.848 105.036 101.156C105.516 99.0255 106.015 96.8988 106.457 94.7603C106.538 94.3679 106.494 93.8707 106.318 93.5162C102.138 85.0965 97.9309 76.69 93.7316 68.2797C93.6044 68.025 93.5077 67.7551 93.3969 67.4923C93.5184 67.2368 93.6695 66.9908 93.7571 66.7242C95.5462 61.2801 97.3217 55.8314 99.1133 50.3882C100.995 44.6707 102.894 38.9586 104.778 33.2418C105.136 32.1554 105.461 31.0578 105.807 29.9452C105.65 29.8736 105.554 29.8283 105.456 29.7847C103.255 28.8003 101.69 27.1402 100.663 25.0119C99.594 22.7942 99.1452 20.4402 99.3572 17.9462C99.6515 14.4867 100.839 11.4974 103.609 9.28674C105.305 7.93344 107.262 7.42921 109.405 7.80541C112.322 8.31757 114.256 10.1625 115.606 12.653C117.085 15.381 117.47 18.3145 116.965 21.3781C116.483 24.2987 115.233 26.7829 112.94 28.6994C112.509 29.0596 111.805 29.3466 111.702 29.7796C111.586 30.2744 111.99 30.8984 112.187 31.4597C113.681 35.7175 115.182 39.9728 116.675 44.2308C118.504 49.4489 120.33 54.6682 122.154 59.8884C123.883 64.8372 125.607 69.7881 127.336 74.7369C127.405 74.9343 127.511 75.1188 127.644 75.4066C128.661 73.7381 129.618 72.1786 130.565 70.6129C133.221 66.2217 135.873 61.8276 138.527 57.4354C141.433 52.6266 144.336 47.8161 147.257 43.0161C147.447 42.7031 147.406 42.5406 147.194 42.2719C144.739 39.1517 143.984 35.592 144.572 31.7213C145.001 28.8972 146.363 26.5557 148.511 24.6958C150.407 23.054 152.592 22.3542 155.089 22.9927C157.634 23.6439 159.364 25.3132 160.614 27.5428C162.183 30.3403 162.545 33.3603 162.062 36.4726C161.675 38.9688 160.66 41.1932 158.828 43.0195C157.696 44.1476 156.368 44.8687 154.804 45.3069C157.906 58.4293 160.999 71.513 164.111 84.6766C165.601 83.387 166.965 82.1946 168.342 81.0176C169.735 79.8267 171.151 78.6621 172.54 77.4662C174.917 75.4193 177.278 73.3525 179.654 71.3043C180.271 70.7726 180.875 70.2012 181.571 69.7929C182.14 69.4581 182.261 69.141 181.995 68.5778C180.854 66.1608 180.65 63.6188 180.979 60.9997C181.333 58.1768 182.435 55.712 184.538 53.7768C187.967 50.6218 192.367 51.0187 195.346 54.2806C197.887 57.0621 198.788 60.4639 198.45 64.2224C198.213 66.8537 197.394 69.2318 195.687 71.2621C193.756 73.5572 191.348 74.7005 188.303 74.1488C187.684 74.0367 187.085 73.8185 186.448 73.6411C186.352 73.8927 186.269 74.0945 186.198 74.3006C185.262 77.0199 184.325 79.7387 183.394 82.4599C181.569 87.7981 179.747 93.1377 177.924 98.4765C176.601 102.35 175.325 106.24 173.917 110.083C173.606 110.929 173.532 111.725 173.539 112.572C173.577 117.47 173.633 122.368 173.658 127.267C173.665 128.549 173.551 129.831 173.546 131.113C173.529 135.307 173.538 139.501 173.536 143.694C173.536 144.584 173.536 144.584 172.636 144.584C153.176 144.584 133.716 144.585 114.257 144.584C108.843 144.584 103.429 144.579 98.0146 144.577Z" fill="#2A1C51"/>
                <path d="M83.4222 67.957C84.9452 70.3212 86.4776 72.6793 87.9891 75.0507C91.5389 80.6194 95.042 86.2184 98.6591 91.7429C99.2609 92.662 99.1752 93.4951 99.1001 94.4038C99.0159 95.4217 98.8414 96.4319 98.7084 97.4458C98.5352 98.7651 98.3583 100.084 98.1942 101.404C98.0894 102.248 98.0139 103.095 97.9098 103.938C97.6986 105.648 97.4714 107.357 97.2615 109.068C97.1555 109.933 97.0601 110.8 96.9918 111.668C96.9798 111.821 97.0917 112.017 97.203 112.142C101.862 117.409 106.526 122.669 111.19 127.931C111.203 127.946 111.204 127.972 111.228 128.049C110.002 129.318 108.757 130.608 107.511 131.898C103.675 135.872 99.8382 139.846 96.0002 143.819C95.9088 143.914 95.8007 143.992 95.7004 144.078C95.0184 144.113 94.3346 144.129 93.6548 144.189C92.1835 144.318 90.7133 144.461 89.2441 144.614C87.7106 144.772 86.1795 144.956 84.646 145.115C83.155 145.269 81.661 145.397 80.1703 145.553C78.7028 145.707 77.2386 145.893 75.7709 146.045C74.2799 146.2 72.7853 146.322 71.294 146.474C69.7383 146.633 68.1853 146.818 66.6297 146.979C65.1604 147.131 63.6886 147.258 62.2195 147.41C60.6859 147.568 59.1549 147.75 57.6215 147.911C56.1746 148.063 54.7255 148.195 53.2787 148.347C51.7673 148.505 50.2573 148.679 48.7465 148.844C47.2139 149.012 45.6818 149.186 44.1481 149.343C43.0513 149.455 41.9522 149.546 40.8538 149.642C40.5295 149.671 40.2975 149.592 40.2635 149.196C40.0936 147.219 39.9065 145.243 39.7317 143.267C39.5879 141.641 39.4864 140.011 39.3056 138.389C39.0819 136.384 38.7601 134.39 38.5501 132.384C38.4284 131.221 38.4464 130.044 38.3948 128.873C38.3539 127.946 38.3134 127.019 38.2543 126.093C38.0856 123.45 37.8923 120.809 37.7412 118.165C37.6854 117.188 37.6163 116.278 37.1879 115.326C35.7742 112.184 34.5187 108.97 33.2116 105.781C31.829 102.407 30.4729 99.0221 29.0757 95.6543C27.6045 92.1079 26.0887 88.58 24.6117 85.0359C23.7613 82.9955 22.9426 80.9417 22.1226 78.8889C21.7835 78.0399 21.4784 77.1774 21.1534 76.3088C21.0507 76.3457 20.984 76.3565 20.9319 76.3901C17.614 78.5292 13.9975 77.8481 11.3052 75.2087C9.84408 73.7763 8.86347 72.0548 8.24585 70.0899C7.48627 67.673 7.40237 65.2496 7.89943 62.79C8.34544 60.5831 9.36565 58.6782 10.9851 57.1052C12.4919 55.6417 14.3495 54.9355 16.397 55.035C18.6043 55.1422 20.4754 56.2096 21.9489 57.8269C24.1964 60.2936 25.2356 63.2778 25.3432 66.5892C25.4095 68.628 25.0052 70.5853 24.1398 72.4365C23.983 72.772 24.0565 72.9427 24.3569 73.1392C24.9109 73.5016 25.4337 73.9122 25.9666 74.3064C29.9613 77.2632 33.9527 80.2247 37.9508 83.1771C40.5807 85.1191 43.219 87.0498 45.8563 88.9819C46.3391 89.3355 46.8353 89.6708 47.3934 90.0622C47.4729 89.5652 47.5502 89.2202 47.5804 88.8711C47.763 86.7626 47.9369 84.6533 48.11 82.5441C48.3353 79.797 48.5566 77.0497 48.7807 74.3024C48.9564 72.1488 49.1345 69.9953 49.3108 67.8416C49.4888 65.666 49.666 63.4903 49.8435 61.3147C50.0209 59.139 50.1985 56.9635 50.3761 54.7879C50.5538 52.6123 50.7362 50.4371 50.9043 48.2609C50.9355 47.8567 50.9087 47.4479 50.9087 47.2292C49.6829 47.0789 48.5506 47.1056 47.5289 46.7823C44.9112 45.9543 43.0034 44.1768 41.8498 41.7184C40.6202 39.0979 40.0872 36.3222 40.5113 33.398C40.8981 30.7314 41.8582 28.3727 43.8832 26.5243C46.0087 24.5841 48.4645 23.971 51.1865 24.927C53.9371 25.8931 55.6824 27.9715 56.8999 30.5378C57.9084 32.6638 58.1897 34.926 58.105 37.2508C58.0329 39.2317 57.4956 41.086 56.4932 42.7883C56.2142 43.2621 56.2635 43.5662 56.5926 43.9636C57.3389 44.8642 58.0528 45.7922 58.763 46.7222C59.9287 48.2489 61.0712 49.7933 62.2409 51.3167C64.0156 53.628 65.8068 55.9267 67.5882 58.2329C69.2752 60.4169 70.9592 62.6031 72.6432 64.7893C75.1358 68.0253 77.6252 71.2637 80.1212 74.4969C80.5755 75.0855 81.0547 75.655 81.5892 76.316C81.6849 75.9975 81.7589 75.7973 81.8051 75.5909C82.1128 74.214 82.4227 72.8375 82.7156 71.4575C82.9623 70.293 83.1874 69.1241 83.4222 67.957Z" fill="#291B51"/>
                <path d="M98.0147 144.577C103.429 144.579 108.843 144.584 114.257 144.584C133.717 144.585 153.176 144.584 172.636 144.584C173.536 144.584 173.536 144.584 173.536 143.694C173.538 139.5 173.529 135.307 173.546 131.113C173.551 129.831 173.665 128.549 173.658 127.267C173.633 122.369 173.577 117.47 173.539 112.572C173.533 111.725 173.607 110.929 173.917 110.083C175.325 106.241 176.601 102.35 177.924 98.4765C179.748 93.1377 181.569 87.798 183.394 82.4599C184.325 79.7388 185.262 77.0199 186.198 74.3005C186.269 74.0945 186.352 73.8928 186.448 73.6411C187.085 73.8184 187.684 74.0367 188.303 74.1487C191.349 74.7005 193.757 73.5572 195.687 71.262C197.395 69.2316 198.213 66.8535 198.45 64.2223C198.788 60.4637 197.887 57.0621 195.347 54.2805C192.367 51.0185 187.967 50.6217 184.538 53.7767C182.435 55.712 181.333 58.1767 180.979 60.9996C180.651 63.6188 180.855 66.1608 181.995 68.5778C182.261 69.1411 182.141 69.4582 181.571 69.7929C180.876 70.2012 180.272 70.7726 179.655 71.3043C177.278 73.3523 174.918 75.4193 172.54 77.4662C171.151 78.6621 169.735 79.8266 168.342 81.0176C166.965 82.1946 165.601 83.387 164.111 84.6766C160.999 71.5131 157.906 58.4294 154.804 45.3069C156.369 44.8686 157.696 44.1476 158.828 43.0195C160.66 41.193 161.676 38.9687 162.062 36.4726C162.545 33.3603 162.183 30.3401 160.614 27.5428C159.364 25.3131 157.634 23.6439 155.089 22.9927C152.593 22.3541 150.407 23.054 148.511 24.6958C146.363 26.5557 145.001 28.8972 144.572 31.7213C143.984 35.5918 144.739 39.1517 147.194 42.2719C147.406 42.5406 147.448 42.7031 147.257 43.0161C144.336 47.8161 141.433 52.6266 138.527 57.4353C135.873 61.8276 133.222 66.2217 130.566 70.6129C129.619 72.1786 128.662 73.7381 127.644 75.4065C127.511 75.1188 127.405 74.9343 127.336 74.7369C125.607 69.7882 123.883 64.8373 122.154 59.8883C120.33 54.6682 118.504 49.4489 116.675 44.2308C115.182 39.9728 113.681 35.7175 112.188 31.4597C111.991 30.8984 111.586 30.2744 111.703 29.7796C111.805 29.3466 112.509 29.0595 112.94 28.6994C115.234 26.7829 116.483 24.2987 116.965 21.3781C117.47 18.3145 117.085 15.381 115.606 12.653C114.256 10.1625 112.322 8.31756 109.405 7.8054C107.262 7.4292 105.305 7.93344 103.609 9.28673C100.839 11.4974 99.6516 14.4867 99.3574 17.9462C99.1453 20.4401 99.594 22.7941 100.663 25.0119C101.69 27.1402 103.255 28.8003 105.456 29.7847C105.554 29.8283 105.651 29.8736 105.807 29.9452C105.461 31.0578 105.137 32.1553 104.779 33.2418C102.894 38.9586 100.995 44.6705 99.1135 50.3882C97.3218 55.8314 95.5464 61.2801 93.7573 66.7242C93.6696 66.9908 93.5185 67.2368 93.397 67.4923C92.2878 65.3113 91.2828 63.0685 90.0356 60.9696C89.0792 59.36 89.0997 57.9428 89.6983 56.1975C92.29 48.6402 94.7291 41.0304 97.2208 33.4388C97.3277 33.1132 97.4613 32.8338 97.1367 32.4759C94.5626 29.6375 93.031 26.2801 92.4654 22.512C91.4729 15.8992 92.9987 9.98076 97.6504 5.05276C100.053 2.50707 103.048 0.918224 106.55 0.558011C111.764 0.0217973 116.167 1.78268 119.605 5.73094C123.495 10.1978 124.858 15.4862 124.31 21.3108C123.954 25.1062 122.61 28.5293 120.299 31.5741C120.157 31.7613 120.154 32.1551 120.239 32.3996C122.616 39.2358 125.012 46.0652 127.406 52.8956C128.064 54.7751 128.724 56.6543 129.422 58.6468C129.571 58.4406 129.687 58.3023 129.779 58.15C132.799 53.1657 135.82 48.1826 138.821 43.1868C138.953 42.9676 138.997 42.5887 138.902 42.3574C138.007 40.1628 137.473 37.8905 137.322 35.5266C136.969 30.0134 138.454 25.0714 142.052 20.8535C144.593 17.8742 147.834 16.0007 151.759 15.6062C156.427 15.1368 160.5 16.583 163.857 19.895C167.058 23.0533 168.835 26.9392 169.351 31.3611C169.948 36.4846 169.049 41.3286 166.066 45.6392C165.315 46.7249 164.336 47.6515 163.49 48.6744C163.341 48.8551 163.222 49.1763 163.272 49.3901C164.959 56.6359 166.668 63.8766 168.376 71.1174C168.401 71.2232 168.455 71.322 168.518 71.4794C170.256 69.9846 171.972 68.5182 173.668 67.0281C173.793 66.9187 173.812 66.635 173.803 66.4364C173.725 64.8721 173.474 63.3 173.563 61.7466C173.988 54.326 178.315 46.7309 186.179 44.8402C192.091 43.419 197.144 45.2484 201.111 49.8294C204.25 53.4538 205.686 57.7505 205.766 62.5395C205.844 67.2346 204.651 71.5225 201.803 75.282C199.325 78.5533 196.101 80.6886 192.004 81.3815C191.585 81.4523 191.378 81.6139 191.235 82.0343C187.84 92.0076 184.424 101.974 181.024 111.946C180.905 112.293 180.857 112.679 180.852 113.048C180.833 114.468 180.846 115.888 180.844 117.308C180.833 126.95 180.822 136.592 180.811 146.234C180.809 148.094 180.811 149.954 180.811 151.892C180.488 151.892 180.273 151.892 180.059 151.892C150.06 151.892 120.061 151.892 90.0624 151.891C89.8854 151.891 89.7085 151.88 89.5315 151.874C89.5319 151.829 89.5236 151.786 89.5064 151.744C91.695 149.886 93.8818 148.026 96.0736 146.172C96.7129 145.631 97.3672 145.108 98.0147 144.577Z" fill="#493C6C"/>
                <path d="M83.4222 67.9571C83.1874 69.124 82.9623 70.293 82.7151 71.4573C82.4222 72.8374 82.1123 74.2139 81.8046 75.5906C81.7586 75.797 81.6845 75.9972 81.5887 76.3158C81.0541 75.6547 80.5751 75.0852 80.1208 74.4966C77.6248 71.2634 75.1354 68.025 72.6428 64.7891C70.9588 62.6029 69.2747 60.4165 67.5878 58.2326C65.8064 55.9265 64.0151 53.6277 62.2405 51.3164C61.0707 49.793 59.9283 48.2486 58.7626 46.7219C58.0526 45.7921 57.3384 44.864 56.5922 43.9633C56.2629 43.566 56.2138 43.2618 56.4927 42.788C57.4952 41.0855 58.0325 39.2314 58.1046 37.2505C58.1892 34.9258 57.9079 32.6635 56.8995 30.5376C55.6821 27.9712 53.9368 25.8929 51.1861 24.9267C48.4641 23.9706 46.0084 24.5838 43.8828 26.524C41.8578 28.3725 40.8978 30.7312 40.5109 33.3977C40.0868 36.322 40.6197 39.0976 41.8494 41.7181C43.0029 44.1765 44.9108 45.954 47.5285 46.7821C48.5502 47.1052 49.6824 47.0786 50.9083 47.229C50.9083 47.4476 50.9351 47.8564 50.9039 48.2606C50.7358 50.4369 50.5532 52.6121 50.3757 54.7876C50.1981 56.9632 50.0206 59.1387 49.843 61.3144C49.6654 63.4901 49.4884 65.6657 49.3103 67.8414C49.134 69.995 48.9561 72.1485 48.7803 74.3022C48.5562 77.0494 48.3349 79.7967 48.1096 82.5438C47.9365 84.6532 47.7627 86.7624 47.58 88.8709C47.5497 89.2199 47.4725 89.5649 47.393 90.0619C46.8349 89.6705 46.3387 89.3352 45.8559 88.9816C43.2185 87.0497 40.5804 85.1188 37.9504 83.1768C33.9523 80.2244 29.961 77.2629 25.9661 74.3061C25.4333 73.9117 24.9104 73.5014 24.3565 73.139C24.0561 72.9424 23.9828 72.7717 24.1394 72.4363C25.0047 70.5849 25.4091 68.6278 25.3428 66.589C25.2351 63.2775 24.196 60.2934 21.9485 57.8267C20.4749 56.2095 18.6038 55.1419 16.3966 55.0347C14.3491 54.9353 12.4914 55.6415 10.9847 57.1049C9.36523 58.6779 8.34502 60.5828 7.899 62.7897C7.40195 65.2492 7.48599 67.6725 8.24543 70.0896C8.8629 72.0545 9.84366 73.7761 11.3048 75.2084C13.9971 77.8478 17.6136 78.529 20.9315 76.3898C20.9836 76.3562 21.0503 76.3454 21.153 76.3086C21.4781 77.1771 21.7832 78.0397 22.1221 78.8886C22.9422 80.9415 23.7607 82.9952 24.6112 85.0357C26.0883 88.5797 27.6041 92.1076 29.0753 95.654C30.4725 99.0218 31.8285 102.407 33.2112 105.78C34.5183 108.97 35.7737 112.184 37.1875 115.326C37.6157 116.278 37.6849 117.188 37.7408 118.165C37.8919 120.808 38.0852 123.45 38.2539 126.092C38.313 127.018 38.3536 127.946 38.3944 128.873C38.446 130.043 38.428 131.221 38.5497 132.384C38.7597 134.39 39.0817 136.384 39.3052 138.389C39.486 140.01 39.5875 141.641 39.7312 143.266C39.9061 145.243 40.0932 147.219 40.2631 149.196C40.2971 149.591 40.5291 149.67 40.8534 149.642C41.9518 149.546 43.0509 149.455 44.1477 149.343C45.6814 149.186 47.2134 149.012 48.7461 148.844C50.2568 148.678 51.7667 148.505 53.2783 148.346C54.7251 148.194 56.1742 148.063 57.6211 147.911C59.1543 147.75 60.6855 147.568 62.2191 147.409C63.6882 147.257 65.1602 147.13 66.6293 146.979C68.1849 146.818 69.7379 146.633 71.2936 146.474C72.7849 146.322 74.2795 146.2 75.7705 146.045C77.2382 145.893 78.7023 145.707 80.1699 145.553C81.6608 145.396 83.1546 145.269 84.6456 145.114C86.1791 144.956 87.7102 144.772 89.2437 144.613C90.7129 144.461 92.1831 144.317 93.6544 144.189C94.3344 144.129 95.018 144.113 95.7 144.077C93.956 145.905 92.213 147.733 90.4673 149.56C89.7931 150.265 89.1364 150.99 88.4236 151.654C88.1578 151.902 87.7678 152.107 87.4117 152.152C85.0488 152.451 82.6814 152.72 80.312 152.963C76.2878 153.375 72.2603 153.758 68.235 154.161C65.6409 154.421 63.0482 154.695 60.4551 154.965C57.9563 155.225 55.458 155.489 52.959 155.747C50.2408 156.028 47.5217 156.301 44.8036 156.583C41.0785 156.969 37.3541 157.361 33.6292 157.748C33.5649 157.755 33.4983 157.74 33.3128 157.726C33.2742 156.44 33.2401 155.147 33.1958 153.854C33.1126 151.428 33.0252 149.002 32.9363 146.577C32.8555 144.373 32.8268 142.166 32.6744 139.967C32.4297 136.436 32.1198 132.909 31.8033 129.383C31.5983 127.1 31.3308 124.822 31.0943 122.541C30.9858 121.495 30.8968 120.446 30.774 119.401C30.7359 119.076 30.652 118.746 30.5283 118.442C26.4909 108.535 22.446 98.6299 18.4028 88.7243C17.9508 87.6169 17.5217 86.4994 17.0384 85.406C16.9489 85.2035 16.6559 84.9692 16.4467 84.9593C12.1233 84.7523 8.56736 82.9313 5.63491 79.8251C3.54535 77.6111 2.14073 75 1.22611 72.0976C0.354325 69.3308 0.0218318 66.4738 0.362685 63.6443C1.09998 57.522 3.74731 52.4732 9.37242 49.4033C11.9124 48.0172 14.6737 47.5028 17.5451 47.8514C22.5492 48.4589 26.3085 51.095 29.1069 55.1909C31.1003 58.1086 32.2174 61.3632 32.4925 64.8721C32.6132 66.4106 32.4601 67.9698 32.4564 69.5198C32.4558 69.7507 32.5205 70.0799 32.6788 70.198C35.505 72.3078 38.3501 74.3921 41.1932 76.4791C41.239 76.5127 41.3097 76.5121 41.4232 76.5418C41.57 74.7552 41.7258 72.9974 41.8561 71.2377C42.0035 69.2494 42.1162 67.2585 42.2661 65.2703C42.4289 63.11 42.6064 60.9507 42.7975 58.7926C42.955 57.0135 43.1357 55.2365 43.3203 53.4601C43.3567 53.1105 43.276 52.9082 42.938 52.7282C38.6506 50.4461 35.9097 46.8616 34.2931 42.3539C33.3224 39.6472 32.8479 36.8302 33.0943 33.979C33.6347 27.7235 36.0624 22.4401 41.6889 19.1555C47.57 15.7223 55.0784 16.9246 60.0831 22.3458C62.6123 25.0855 64.231 28.3016 64.9363 31.952C65.1726 33.1751 65.1852 34.441 65.3067 35.6867C65.5103 37.7766 65.1421 39.8132 64.6955 41.8347C64.6003 42.2658 64.692 42.5383 64.9355 42.8532C68.2459 47.1339 71.5491 51.4201 74.8539 55.7051C75.7479 56.8642 76.5626 58.0964 77.5507 59.1687C79.9128 61.732 81.3352 64.9136 83.3269 67.7167C83.3754 67.7849 83.3911 67.8764 83.4222 67.9571Z" fill="#493C6C"/>
                <path d="M89.5061 151.744C89.5232 151.786 89.5316 151.829 89.5312 151.874C89.4946 151.87 89.4581 151.865 89.4218 151.861C89.4499 151.822 89.4779 151.783 89.5061 151.744Z" fill="#6A6086"/>
            </svg> }

        </div> : null}

        <ul className='Player-Table'>
            {player_list.map((player_name, index) => {
                return (
                    <li key = {index.toString()}>
                        <span>{player_name}</span> <span> {score_arr[index]}</span>
                    </li>
                    
                )
            })}
        </ul>
        
    </div>
}

//<button id = "Black-Card-Button" onClick={newBlackCardHandle}> New Black Card </button>


