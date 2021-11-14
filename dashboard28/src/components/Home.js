import React from 'react';
import './styles/Home.css';
import img from './assets/img_ex.png'
import { Link } from 'react-router-dom';
export default function Home(props){
    return(
        <div className="content">
            <div className="block">
                <div className="text"><p>Explore an overview of generic metrics regarding quantity of sales and profit according to a defined time interval:</p></div>
                <div className="icons">
                    <Link to="/timeplots/l7data" className="link"> <img className="img" src={img}/> </Link>
                    <Link to="/timeplots/l30data" className="link"> <img className="img" src={img}/> </Link>
                </div>
            </div>
            <div className="block">
                <div className="text"><p>Explore a collection of parameters derived from an analysis of a selected time interval:</p></div>
                <div className="icons">
                    <Link to="/pieplots" className="link"> <img className="img" src={img}/> </Link>
                    <Link to="/pieplots" className="link"> <img className="img" src={img}/> </Link>
                </div>
            </div>
        </div>
    )
}