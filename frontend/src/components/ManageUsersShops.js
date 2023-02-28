import React, { useState, useEffect } from 'react';

export default function ManageUsersShops(props) {
    const { userId } = props;
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await fetch(`http://localhost:8888/final-project/backend/shop/get-user-shops.php`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({ userId })
                });
                const data = await response.json();
                setShops(data.shops);
            } catch (error) {
                console.error(error);
            }
        };

        fetchShops().then(() => {});
    }, [userId]);

    return (
        <div>
            <p>Shops:</p>
            {shops && shops.map((shop) => (
                <div onClick={() => props.setMapLocation([shop.lat, shop.lng])} key={shop.id}>
                    <p>{shop.address}</p>
                </div>
            ))}
        </div>
    );
}
