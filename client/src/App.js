import React from 'react';
import { Router } from "@reach/router"
import Home from "./Home"
import HomeDetails from "./HomeDetails"
import User from "./User"
import RecipeForm from "./RecipeForm"
import RecipeAdmin from "./RecipeAdmin"
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
                    <HomeDetails path="/recipe/:id" /> 
                    <User path="api/user"  />
                    <RecipeForm path="api/user" />
                    <RecipeAdmin path="api/user" />
                  </Router>
             
            </main>
       </div>
    );
}


export default App;
