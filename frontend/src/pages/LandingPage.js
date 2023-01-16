import React from "react";
import {Link} from "react-router-dom";

function LandingPage () {
    return (
        <div>
            <h1>Landing Page</h1>
            <button name="save">
                <Link to='/login'>Log in</Link>
            </button>
        </div>
    );
}

export default LandingPage;