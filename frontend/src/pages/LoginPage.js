import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // const handleLogin = () => {
    //     console.log('login: ' + loggedIn);
    //     setLoggedIn(true);
    //     console.log('login: ' + loggedIn);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:8888/final-project/backend/login.php", {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status === "success") {
            // handleLogin();
            navigate('/dashboard', { state: { userData: data.userData } });
        } else {
            setError(data.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <p>{error}</p>
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
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <button type="submit" name="save">
                            Log in
                        </button>
                    )}
                </div>
            </form>
            <p>
                Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
        </div>
    );
}

export default LoginPage;

