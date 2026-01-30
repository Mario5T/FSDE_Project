import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const Home = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold mb-4">Welcome to SnackSafari</h1>
            <p className="mb-8">Discover delicious snacks from around the world.</p>
            {user ? (
                <div>
                    <p className="text-xl mb-4">Hello, {user.name}!</p>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="space-x-4">
                    <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-900 text-white font-inter">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
