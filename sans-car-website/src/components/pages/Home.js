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
                <h1>Sans Car Bot for Discord</h1>
                <div className="discord-mock">
                    <img src="https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279" alt="Sans car"></img>
                    <button>Add Sans Car to your server</button>
                </div>
            </div>

            <div className="features">
                {/*Put features here. Use apis and don't hard code*/}
                <h1>Features</h1>

                <div className="grid-item">
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                </div>

            </div>

            <div className="documentation">
                {/* Put documentation and apis here. Use apis and don't hard code */}
                <h1>Api Documentation</h1>

                <div className="grid-item">
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                    <div className="grid-item-wrapper">
                        <h2>GET "/api/ping"</h2>
                        <p>Pings the server to keep it alive</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
