import React from 'react'

import { Navbar, DropdownNavItem, NavItem, DropdownMenu } from '../navbar/Navbar';

export default function DefaultNavbar() {
    return (
        <Navbar >
            {/* Change this to a special dropdown icon so it can be hidden unless there's a mobile query */}
            <DropdownNavItem icon="☰">
                <DropdownMenu></DropdownMenu>
            </DropdownNavItem>

            <NavItem title="Home" location="/" />
            <NavItem title="About" location="/about" />
            <NavItem title="Add Sans Car" location="/add-bot" />
        </Navbar>
    )
}
