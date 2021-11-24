import React, { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { SideBarData } from './data/SideBarData';
import './styles/SideBar.css';

function SideBar() {

    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);

    return (
        <div className="main-sidebar">
            <div className="sidebar">
                <Link to="#" className="menu-bars">
                    <FiMenu size={26} color="white" onClick={showSideBar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'sidebar-menu active' :  'sidebar-menu'}>
                <ul className="sidebar-menu-items">
                    <li className="sidebar-toogle">
                        <Link to="#" className="menu-bars" onClick={showSideBar}>
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
