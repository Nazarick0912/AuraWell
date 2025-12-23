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
    const logout = () => {
        fetch('http://localhost:9090/api/auth/logout', { 
            method: 'POST', 
            credentials: 'include' 
        })
        .then(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);