import React from 'react'

import DefaultNavbar from '../layouts/DefaultNavbar';
import Footer from '../layouts/Footer';

import './Home.css';

// Grid container does the main page
export default function Home() {
    return (
        <div className="grid-container">
            <DefaultNavbar />
            <div className="body grid-item">
                <h1>Download Sans Car Today!</h1>
                <img src="https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279" alt="Place Sans Car image here"></img>
                <button>Add Sans Car to your server</button>
            </div>

            <div className="features grid-item">
                {/*Put features here*/}
                <h1>Features</h1>
            </div>

            <div className="documentation grid-item">
                {/* Put documentation and apis here */}
                <h1>Api Documentation</h1>

                <h2>GET "/api/ping"</h2>
                <p>Pings the server to keep it alive</p>
            </div>
            <Footer />
        </div>
    )
}
