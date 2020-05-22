import React from 'react'

import { Navbar, NavItem, DropdownMenu } from '../navbar/Navbar';

export default function DefaultNavbar() {
    return (
        <Navbar >
            <NavItem icon="🤣" />
            <NavItem icon="🤣" />
            <NavItem icon="🤣" />

            <NavItem icon="☰">
                <DropdownMenu></DropdownMenu>
            </NavItem>
        </Navbar>
    )
}
