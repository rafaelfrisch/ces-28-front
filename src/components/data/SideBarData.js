import React from 'react';
import { FiGrid, FiDatabase, FiUser, FiBarChart2 } from "react-icons/fi";

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FiGrid size={24} color="white" />,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: '/dashboards',
        icon: <FiBarChart2 size={24} color="white" />,
        cName: 'nav-text'
    },
    {
        title: 'Produtos',
        path: '/products',
        icon: <FiDatabase size={24} color="white" />,
        cName: 'nav-text'
    },
    {
        title: 'Usuários',
        path: '/users',
        icon: <FiUser size={24} color="white" />,
        cName: 'nav-text'
    }
]