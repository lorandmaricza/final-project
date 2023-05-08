import React, {useEffect, useState} from 'react';
import {checkSession} from "../utils/helpers";
import {useNavigate} from "react-router-dom";

export default function UserInfoPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        checkSession().then((data) => {
            if (data.status === "logged_in") {
                setUserData(data.userData)
            } else {
                navigate('/');
            }
        }).catch(error => console.log(error));
    }, [navigate]);

    const handleGoBack = () => {
        navigate('/dashboard', { state: { userData: userData } });
    }

    const getRole = (roleId) => {
        let role;
        switch (roleId) {
            case 1: role = "consumer"; break;
            case 2: role = "supplier"; break;
            default: role = "admin";
        }
        return role;
    }

    return (
        <div>
            <p onClick={handleGoBack}>Go back</p>
            <h1>Welcome {userData.first_name}</h1>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.first_name}</p>
            <p>Last Name: {userData.last_name}</p>
            <p>Role: {getRole(userData.role_id)}</p>
        </div>
    )
}
