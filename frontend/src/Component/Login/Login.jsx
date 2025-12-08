import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// state for input fields
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // state for error message 
    const [error, setError] = useState("");

    // navigation hook 
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // perform validatiomn or API call later
    };

    return (
        <div className="login-container">
            {/*form goes here*/ }
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <label>password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    aria-required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</ button>            
            </form>
        </div>
    );
};

export default Login;