import React, { useState } from 'react'

import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as ChevronIcon} from '../../icons/chevron.svg'

import './Navbar.css';

export function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    )
}

export function NavItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

export function DropdownMenu(props) {

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
    
                {props.children}
    
                <span className="icon-right icon-button">{props.rightIcon}</span>
            </a>
        );
    }
    

    return (
        <div className="dropdown">
            <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>My Profile</DropdownItem>
            <DropdownItem>Help</DropdownItem>
        </div>
    );
}



export default { Navbar, NavItem, DropdownMenu }