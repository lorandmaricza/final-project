import React, { useState } from "react";
import {Link} from "react-router-dom";

function SignUpPage() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
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
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <p>Create your account</p>
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
                        value="Consumer"
                        onChange={handleChange}
                        checked={user.role === "Consumer"}
                    />
                    <label htmlFor="css">consumer</label>
                    <input
                        type="radio"
                        name="role"
                        value="Supplier"
                        onChange={handleChange}
                        checked={user.role === "Supplier"}
                    />
                    <label htmlFor="html">supplier</label>
                </div>
                <br />
                <div>
                    <button type="submit" name="save">
                        Sign up
                    </button>
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
