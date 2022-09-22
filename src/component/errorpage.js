
import React from 'react';

import { useState, useEffect } from "react";

import {
    useNavigate
  } from 'react-router-dom';

export default function ErrorPage (){
    const navigate = useNavigate();

    //mount
    useEffect(() => {
        setTimeout(async () => {
            navigate("/");
        }, []); 
    });

    

    return <div>
        <h1>Error</h1>

       
    </div>
}