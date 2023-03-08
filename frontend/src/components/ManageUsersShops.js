import React, { useState, useEffect } from 'react';
import classes from './ManageUsersShops.module.css';
import ShopCategories from "./ShopCategories";
import AddShopForm from "./AddShopForm";

export default function ManageUsersShops(props) {
    const { userId } = props;
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [showAddShopForm, setShowAddShopForm] = useState(false);
    const [disableShowCategoriesButton, setDisableShowCategoriesButton] = useState(false);

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
        setDisableShowCategoriesButton(false);
        setSelectedShop(selectedShop === shopId ? null : shopId);
    }

    const handleManageClick = (shopId) => {
        setDisableShowCategoriesButton(true);
        setShowAddShopForm(showAddShopForm === shopId ? null : shopId);
        setSelectedShop(null);
    }

    return (
        <div>
            <p>Shops:</p>
            {shops && shops.map((shop, index) => (
                <div
                    onClick={() => props.setMapLocation([shop.lat, shop.lng])}
                    key={index}>
                    <p>
                        {shop.address}
                        <button
                            onClick={() => handleShowShopsCategories(shop.id)}
                            className={classes.buttons}
                            disabled={disableShowCategoriesButton && selectedShop === shop.id}
                        >
                            show categories
                        </button>
                        <button onClick={() => handleManageClick(shop.id)} className={classes.buttons}>manage</button>
                    </p>
                    <div>
                        {selectedShop === shop.id && !showAddShopForm && <ShopCategories shopId={shop.id} />}
                        {showAddShopForm === shop.id && <AddShopForm shopId={shop.id}/>}
                    </div>
                </div>
            ))}
        </div>
    );
}
