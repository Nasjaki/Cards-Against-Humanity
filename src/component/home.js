
import React from 'react';


function togglePopup(){
    document.getElementById("Show-Game-Guide").classList.toggle("active");
}

export default function Home (){
    return <div>
        <h1>Welcome to Cards Against Humanity!</h1>

        <div className='Game-Guide' id='Show-Game-Guide'>
            <div className='Overlay' onClick={togglePopup}>

            </div>
            <div className='Content'>

                <div className='Exit-Button'onClick={togglePopup}>&#x2715;</div>

                <h2>Game Guide</h2>
                <p>
                    Paste sample text here...
                </p>
            </div>

        </div>

        

        <button className='Game-Buttons' id='Help-Button' onClick={togglePopup}>?</button>

        
    </div>

}
  
