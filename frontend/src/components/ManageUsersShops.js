import React, { useState, useEffect } from 'react';
import classes from './ManageUsersShops.module.css';
import ShopCategories from "./ShopCategories";

export default function ManageUsersShops(props) {
    const { userId } = props;
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);

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

    const handleShowShopsCategories = (shopId) => {
        setSelectedShop(selectedShop === shopId ? null : shopId);
    }

    return (
        <div>
            <p>Shops:</p>
            {shops && shops.map((shop) => (
                <div
                    onClick={() => props.setMapLocation([shop.lat, shop.lng])}
                    key={shop.id}>
                    <p>
                        {shop.address}
                        <button onClick={() => handleShowShopsCategories(shop.id)} className={classes.buttons}>show categories</button>
                        <button className={classes.buttons}>manage</button>
                    </p>
                    <div>
                        {selectedShop === shop.id && <ShopCategories shopId={shop.id} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
