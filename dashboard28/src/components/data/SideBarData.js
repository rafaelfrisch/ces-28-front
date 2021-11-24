import React from 'react';
import { FiGrid, FiDatabase, FiUser } from "react-icons/fi";

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <FiGrid size={24} color="white" />,
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