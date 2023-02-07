// import {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import React from "react";
import './App.css';
// import {useState} from "react";

function App() {
    // const [loggedIn, setLoggedIn] = useState(false);

    // const handleLogin = () => {
    //     setLoggedIn(!loggedIn);
    //     console.log('app: ' + loggedIn);
    // }

    return (
        // <Layout loggedIn={loggedIn}>
        <Layout>
            <Routes>
                {/*<Route path="/" element={<LandingPage handleLogin={handleLogin} />} />*/}
                {/*<Route path="/login" element={<LoginPage handleLogin={handleLogin}/>} />*/}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Layout>
);
}


export default App;
