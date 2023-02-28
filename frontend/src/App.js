import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import React, {useState} from "react";
import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Layout loggedIn={loggedIn}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn}/>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Dashboard setLoggedIn={setLoggedIn}/>} />
            </Routes>
        </Layout>
    );
}


export default App;
