
import React from 'react';

import get_packs from '../code/get_packs';

async function testFunc() {
    let packs = await get_packs();
    console.log(packs);
}
  
export default function Home (){
    return <div>
        <h1>Welcome to Cards Against Humanity!</h1>

        <div className='Login-Buttons'>
                <button id = "Create-User-Button" onClick={testFunc}> Test </button>
                
        </div>
    </div>
}
  
