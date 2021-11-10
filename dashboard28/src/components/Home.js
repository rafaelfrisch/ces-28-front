import React from 'react';
import './styles/Home.css';
import img from './assets/img_ex.png'
import { Link } from 'react-router-dom';
export default function Home(props){
    return(
        <div className="icons">
            <Link to="/timeplots" className="link"> <img className="img" src={img}/> </Link>
            <Link to="/pieplots" className="link"> <img  className="img" src={img}/> </Link>
        </div>
    )
}