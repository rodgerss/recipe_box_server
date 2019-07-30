import React from 'react';
import { Router } from "@reach/router"
import Home from "./Home"
import Navbar from './Navbar';
import './App.css';



function App() {
  return (
    <div className="rcls-app">
            <header className="rcls-header">
                <Navbar />
            </header>
            <main className="rcls-main">
                 <Router>
                    <Home path="/" />
                    {/* <HomeDetails path="/recipe/:id" /> */}
                  </Router>
             
            </main>
       </div>
    );
}


export default App;
