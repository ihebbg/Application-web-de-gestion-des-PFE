import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
export const SidebarData = [
    {
        title: 'Home',
        path: '/admin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Gestion des étudiants',
        path: '/admin/etudiants',
        icon: <FaIcons.FaUniversity />,
        cName: 'nav-text',
    },
    {
        title: 'Gestion des enseignants',
        path: '/admin/enseignants',
        icon: <FaIcons.FaUniversity />,
        cName: 'nav-text',
    },
    {
        title: 'Gestion des PFE',
        path: '/admin/pfe',
        icon: <IoIcons.IoIosSchool />,
        cName: 'nav-text',
    },
    {
        title: 'Gestion des années universitaires',
        path: '/admin/années_universitaires',
        icon: <AiIcons.AiFillCalendar />,
        cName: 'nav-text',
    },
]
