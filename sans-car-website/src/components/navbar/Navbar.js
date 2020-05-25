import React, { useState } from 'react'

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

export function DropdownNavItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className="dropdown-nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

export function NavItem(props) {

    const [open, setOpen] = useState(false);

    const path = props.location || "#";

    return (
        <li className="nav-item">
            <a href={path} className={props.icon ? "icon-button" : "text-button"} onClick={() => setOpen(!open)}>
                {props.icon || props.title}
            </a>

            {open && props.children}
        </li>
    );
}

export function DropdownMenu(props) {

    function DropdownItem(props) {
        const path = props.location;

        return (
            <a href={path} className="menu-item">
                {props.children}
            </a>
        );
    }
    

    return (
        <div className="dropdown">
            <DropdownItem location="/">Home</DropdownItem>
            <DropdownItem location="/about">About</DropdownItem>
            <DropdownItem location="/add-bot">Add Sans Car</DropdownItem>
        </div>
    );
}



export default { Navbar, DropdownNavItem, NavItem, DropdownMenu }