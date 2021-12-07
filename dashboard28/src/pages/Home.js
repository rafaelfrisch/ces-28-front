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
                Home
            </div>
        )
    else
        return(
            <Login/>
        )
}