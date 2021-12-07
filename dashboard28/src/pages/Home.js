import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useState } from 'react';
import './styles/Home.css';
import Login from '../components/Login'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import PlaceToVisit from '../components/PlaceToVisit';
import utils from '../utils/utils'

export default function Home(){

    const [isLogged, setIsLogged] = useState(false);
    const useStyles = makeStyles((theme) => ({
        root: {
          minHeight: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: 'black',
        },
    }));
    const classes = useStyles();

    if(localStorage.getItem("token") != null)
        return(
            <div className={classes.root}><SideBar/>
                <CssBaseline />
                <Header />
                <PlaceToVisit />
                Homee
            </div>
        )
    else
        return(
            <Login/>
        )
}