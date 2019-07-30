import React from "react";
import { Link } from "@reach/router"

function NavBar() {
    return (
        <div className="rcls-container">
            <nav className="rcls-nav">
                <span className="rcls-title">Recipe_box</span>

                
                <Link to="/recipe">Recipe</Link>
                <Link  to="/user">User</Link>
                
            </nav>
        </div>
    );
}

export default NavBar;