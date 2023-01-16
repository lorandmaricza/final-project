import React, { useState } from "react";
import {Link} from "react-router-dom";

function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // send user object to server
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
        </div>
    );
}

export default LoginPage;

