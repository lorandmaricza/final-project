import React, { useState, useEffect } from 'react';
import classes from './ManageUsersShops.module.css';
import ShopCategories from "./ShopCategories";
import ManageShopForm from "./ManageShopForm";

export default function ManageUsersShops(props) {
    const { userId } = props;
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [showAddShopForm, setShowAddShopForm] = useState(false);
    const [disableShowCategoriesButton, setDisableShowCategoriesButton] = useState(false);
    const [shopDeleted, setShopDeleted] = useState(false);
    const [shopChanged, setShopChanged] = useState(false);
    const [, setError] = useState("");
    const [, setMessage] = useState("");

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
                setShopChanged(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchShops().then(() => {});
        setShopDeleted(false);
    }, [userId, shopDeleted, shopChanged]);

    const handleShowShopsCategories = (shopId) => {
        setDisableShowCategoriesButton(false);
        setSelectedShop(selectedShop === shopId ? null : shopId);
    }

    const handleManageClick = (shopId) => {
        setDisableShowCategoriesButton(true);
        setShowAddShopForm(showAddShopForm === shopId ? null : shopId);
        setSelectedShop(null);
    }

    const updateUserShops = async (shop, updated) => {
        let updatedShops;
        let file;
        if (updated === 'address') {
            updatedShops = shops.map((userShop) => {
                if (userShop.id === shop.id) {
                    return {
                        ...userShop,
                        address: shop.address,
                        lat: shop.lat,
                        lng: shop.lng,
                    };
                }
                return userShop;
            });

            file = 'shop/update-shop-address';
        } else if (updated === 'categories') {
            updatedShops = shops.map((userShop) => {
                if (userShop.id === shop.id) {
                    return {
                        ...userShop,
                        categories: shop.categories,
                    };
                }
                return userShop;
            });

            file = 'category/update-shop-categories';
        }

        if (file) {
            try {
                await fetch(
                    'http://localhost:8888/final-project/backend/' + file + '.php',
                    {
                        method: 'POST',
                        mode: "cors",
                        credentials: "include",
                        body: JSON.stringify(shop)
                    });
            } catch (error) {
                console.error(error);
            }
        }

        setShops(updatedShops);
        setShopChanged(true);
    };

    const onUpdateAddress = async (shop) => {
        const updated = 'address';
        try {
            await fetch(
                'http://localhost:8888/final-project/backend/shop/update-shop-address.php',
                {
                    method: 'POST',
                    mode: "cors",
                    credentials: "include",
                    body: JSON.stringify(shop)
                });
            await updateUserShops(shop, updated);
        } catch (error) {
            console.error(error);
        }
    }
    const onUpdateCategory = async (shop) => {
        console.log(shop);

        const updated = 'categories';
        await updateUserShops(shop, updated);
    }

    const onDeleteShop = async (shopId) => {
        const response = await fetch('http://localhost:8888/final-project/backend/shop/delete-shop.php', {
            method: 'POST',
            body: JSON.stringify({ shopId }),
        });
        const data = await response.json();

        if (data.status === "success") {
            setMessage(data.message);
            setShopDeleted(true);
        } else {
            setError(data.message);
        }
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
                    <div className={classes.wrapper}>
                        {selectedShop === shop.id && !showAddShopForm && <ShopCategories shopId={shop.id} />}
                        {showAddShopForm === shop.id && <ManageShopForm shopId={shop.id} onUpdateAddress={onUpdateAddress} onUpdateCategory={onUpdateCategory} onDeleteShop={onDeleteShop}/>}
                    </div>
                </div>
            ))}
        </div>
    );
}
