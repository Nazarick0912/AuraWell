import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Keep user logged in after refresh the website
    useEffect(() => {
        fetch('http://localhost:9090/api/auth/me', { credentials: 'include' })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("No session");
            })
            .then(data => {
                setUser(data); //put the Java User object into React state
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    //login 
    const login = (userData) => {
        setUser(userData);
    };

    //logout
    const logout = async () => {
        try {
            await fetch('http://localhost:9090/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Important to send the cookie so the server knows which session to kill
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null); // Always clear the local user even if the network request fails
            window.location.href = '/login'; // Redirect to login page
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);