import React from 'react'
import DefaultNavbar from '../layouts/DefaultNavbar'
import Footer from '../layouts/Footer'

import './About.css'

export default function About() {
    return (
        <div className="grid-container">
            <DefaultNavbar />
                <div className="about about-container">
                    <h1>About the bot</h1>
                    <p>Mainly just a passion project to make a cool bot. I'll update this when I get a better idea about what I want to 
                        do with this bot.
                    </p>
                </div>
            <Footer />
        </div>
    )
}
