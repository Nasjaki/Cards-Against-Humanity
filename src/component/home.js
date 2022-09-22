
import React from 'react';


function togglePopup(){
    document.getElementById("Show-Game-Guide").classList.toggle("active");
}

export default function Home (){
    return (<header>
        <body>

        
            <h1>Welcome to Cards Against Humanity!</h1>

            <div className='Game-Guide' id='Show-Game-Guide'>
                <div className='Overlay' onClick={togglePopup}>

                </div>
                <div className='Content'>

                    <div className='Exit-Button'onClick={togglePopup}>&#x2715;</div>

                    <h2>Game Guide</h2>
                    <div className="Game-Guide-Text">
                        <p>
                            The Card Czar begins the first round by drawing a black card and displaying it for the group.
                            The other players select the best, funniest, or craziest word or phrase from their hand of white cards to complete the statement.
                        </p>
                        <p>
                            After the Players committed their answer the Czar is able to choose the best, funniest, or craziest card as the winner of the round.
                        </p>
                        <p>
                            The winner of the round is rewarded with 1 point. The first player that achieves "X" points will win the game.
                            The Card Czar is chosen by random after each round.
                        </p>
                    </div>
                </div>

            </div>

            

            <button className='Game-Buttons' id='Help-Button' onClick={togglePopup}>?</button>


            
        </body>

        <div className='footer_container'>
            <footer>
                <p>Projekt von: Nils Jonack, Jiaying He und Niklas Stoll</p>
                <p>Unter Aufsicht von Toni Barth</p>
            </footer>
        </div>

        </header>
    )
}
  
