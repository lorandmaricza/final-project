import React, {useEffect, useState} from 'react';
import classes from "./DropdownMenu.module.scss";
import {useNavigate} from "react-router-dom";
import {checkSession} from "../utils/helpers";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function DropdownMenu(props) {
    const navigate = useNavigate();
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        checkSession().then((data) => {
            setRoleId(data.userData.role_id);
        }).catch(error => console.log(error));
    }, []);

    const handleUserIconClick = () => {
        props.closeMenu();
        navigate('/user');
    }

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8888/final-project/backend/logout.php", {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! message: ${response.message}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
            props.closeMenu();
            props.setLoggedIn(false);
            navigate('/');
        }
    }

    return (
        <div className={classes.dropdownMenu}>
            <div>
                <AccountCircleIcon className={classes.userIcon} onClick={handleUserIconClick}/>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}