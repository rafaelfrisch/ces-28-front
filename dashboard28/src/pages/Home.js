import React from 'react';
import './styles/Home.css';
import Login from '../components/Login'
import SideBar from '../components/SideBar';
import utils from '../utils/utils'

export default function Home(){


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