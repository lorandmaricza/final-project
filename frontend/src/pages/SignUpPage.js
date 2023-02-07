import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

function SignUpPage() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:8888/final-project/backend/signup.php", {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status === "success") {
            navigate('/login');
        } else {
            setError(data.message);
        }
    };


    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <p>Create your account</p>
                <p>{error}</p>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="email"
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
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="radio"
                        name="role"
                        value="consumer"
                        onChange={handleChange}
                        checked={user.role === "consumer"}
                    />
                    <label htmlFor="css">consumer</label>
                    <input
                        type="radio"
                        name="role"
                        value="supplier"
                        onChange={handleChange}
                        checked={user.role === "supplier"}
                    />
                    <label htmlFor="html">supplier</label>
                </div>
                <br />
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <button type="submit" name="save">
                            Sign up
                        </button>
                    )}
                </div>
                <br />
                <div>
                    Already have an account? <Link to='/login'>Log in</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;
