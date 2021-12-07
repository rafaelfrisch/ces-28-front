import React from 'react';
import { useState } from 'react';
import './styles/Home.css';
import img from './assets/img_ex.png'
import { Link } from 'react-router-dom';
import Login from '../components/Login'
import SideBar from '../components/SideBar';

export default function Home(props){

    const [isLogged, setIsLogged] = useState(false);

    if(localStorage.getItem("token") != null)
        return(
            <div><SideBar/>
                <div className="content">
                    <div className="block">
                        <div className="itens">
                            <div className="text"><p>Explore an overview of generic metrics regarding quantity of sales and profit according to a defined time interval:</p></div>
                            <div className="icons">
                                <Link to="/dashboards" className="link"> <img className="img" src={img}/> </Link>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="itens">
                            <div className="text"><p>Explore a collection of parameters derived from an analysis of a selected time interval:</p></div>
                            <div className="icons">
                                <Link to="/pieplots" className="link"> <img className="img" src={img}/> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    else
        return(
            <Login/>
        )
}