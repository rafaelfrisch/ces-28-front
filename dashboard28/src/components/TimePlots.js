import React from 'react';
import './styles/Home.css';
import img from './assets/img_ex.png'
import data from './Data.js'
import ChartEx from './ChartEx';
export default function Time(props){
    
    console.log(data)
    return(
        <div>
        <ChartEx/>
        <ChartEx/>
        <ChartEx/>
        </div>
    );
}