import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { SideBarData } from './data/SideBarData';
import './styles/SideBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import utils from '../utils/utils'

function SideBar(props) {

    const [userData, setUserData] = useState(null)
    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);

    useEffect(() => {
        utils.getUserByToken(localStorage.getItem("token")).then(data => setUserData(data))
    }, [])

    let exitSection = () => {
        localStorage.clear();
        document.location.href="/";
    }

    return (
        <div className="main-sidebar">
            <div className="sidebar">
                <Link to="#" className="menu-bars" onClick={showSideBar}>
                    <FiMenu size={26} color="white"/>
                </Link>
                <div className="user-profile">
                    <Dropdown style={{backgroundColor: 'rgba(255, 255, 255, .0)', borderColor: 'rgba(255, 255, 255, .0)'}}>
                        <Dropdown.Toggle style={{backgroundColor: 'rgba(255, 255, 255, .0)', boxShadow: '0 0 0 0 rgba(255, 255, 255, .0)', borderColor: 'rgba(255, 255, 255, .0)'}} id="dropdown-basic">
                            {userData !== null ? userData.name : null}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item href="#/action-1" onClick={exitSection}>Sair</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <nav className={sidebar ? 'sidebar-menu active' :  'sidebar-menu'}>
                <ul className="sidebar-menu-items">
                    <li className="sidebar-toogle">
                        <Link to="#" className="menu-bars" style={{marginLeft: -10}} onClick={showSideBar}>
                            <FiX size={26} color="white"/>
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path} style={{height: '100%', width: '100%'}} onClick={showSideBar}>
                                    {item.icon}
                                    <span>{item.title}</span>  
                                </Link>    
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;
