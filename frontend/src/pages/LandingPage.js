import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { checkSession } from '../utils/helpers';


function LandingPage () {
    const navigate = useNavigate();

    useEffect(() => {

        checkSession().then((data) => {
            if (data.status === "logged_in") {
                navigate('/dashboard', { state: { userData: data.userData } });
            } else {
                navigate('/');
            }
        }).catch(error => console.log(error));
    }, [navigate]);

    return (
        <div>
            <h1>Landing Page</h1>
            <p>some description about the application...</p>
            <button onClick={() => {
                navigate('/login');
            }}>Log in</button>
        </div>
    );
}

export default LandingPage;