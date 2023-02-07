import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ManageCategories from '../components/ManageCategories';
// import Map1 from "../components/Map1";
import Map2 from "../components/Map2";

export default function Dashboard() {
    const {state} = useLocation();
    const { userData } = state;
    const navigate = useNavigate();
    const [showManageCategoriesComponent, setShowManageCategoriesComponent] = useState(false);
    const [showMapComponent, setShowMapComponent] = useState(false);

    const getRole = (roleId) => {
        let role;
        switch (roleId) {
            case 1: role = "consumer"; break;
            case 2: role = "supplier"; break;
            default: role = "admin";
        }
        return role;
    }

    const handleManageList = () => {
        setShowManageCategoriesComponent(!showManageCategoriesComponent);
    }

    const handleManageMap = () => {
        setShowMapComponent(!showMapComponent)
    }

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8888/final-project/backend/logout.php", {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! message: ${response.message}`);
        }

        const data = await response.json();

        console.log(data);

        if (data.status === 'success') {
            navigate('/');
        }
    }

    return (
        <div>
            <h1>Welcome {userData.first_name}</h1>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.first_name} {userData.last_name}</p>
            <p>Role: {getRole(userData.role_id)}</p>

            {userData.role_id === 3 &&
                <button onClick={handleManageList}>Manage categories</button>}
            {userData.role_id === 2 &&
                <button onClick={handleManageMap}>Manage map</button>}

            <button onClick={handleLogout}>Log out</button>

            {showManageCategoriesComponent && <ManageCategories />}
            {/*{showMapComponent && <Map1 />}*/}
            {showMapComponent && <Map2 />}
        </div>
    )
}