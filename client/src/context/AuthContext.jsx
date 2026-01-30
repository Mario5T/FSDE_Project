import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Ideally verify token with backend here
            // For now, simple check
            checkUserLoggedIn();
        } else {
            setLoading(false);
        }
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await axios.get("http://localhost:5001/api/auth/me");
            setUser(data);
        } catch (error) {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const { data } = await axios.post("http://localhost:5001/api/auth/login", {
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setUser(data);
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post("http://localhost:5001/api/auth/register", {
            name,
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
