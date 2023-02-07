import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { checkSession } from '../utils/helpers';


function LandingPage () {
    // const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const handleLogin = () => {
        //     setLoggedIn(!loggedIn);
        //     console.log('landing: ' + loggedIn);
        // }

        checkSession().then((data) => {
            if (data.status === "logged_in") {
                // handleLogin();
                navigate('/dashboard', { state: { userData: data.userData } });
            } else {
                // needed?
                // handleLogin();
                navigate('/');
            }
        }).catch(error => console.log(error));

    // }, [loggedIn, navigate]);
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