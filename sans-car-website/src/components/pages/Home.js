import React from 'react'

import DefaultNavbar from '../layouts/DefaultNavbar';
import Footer from '../layouts/Footer';

import './Home.css';

// Grid container does the main page
export default function Home() {
    return (
        <div className="grid-container">
            <DefaultNavbar />
            <div className="body">
                <h1>Download Sans Car Today!</h1>
                <button>Add Sans Car to your server</button>
                <image>Place Sans Car image here</image>
            </div>
            <Footer />
        </div>
    )
}
