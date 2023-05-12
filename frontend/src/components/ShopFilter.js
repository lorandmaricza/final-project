import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import classes from './ShopFilter.module.scss';
import ShopCategories from "./ShopCategories";

export default function ShopFilter(props) {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [distance, setDistance] = useState(1);
    const [shops, setShops] = useState([]);
    const { currentLocation } = props;
    const [selectedShop, setSelectedShop] = useState(null);
    const [disableShowCategoriesButton, setDisableShowCategoriesButton] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(
                'http://localhost:8888/final-project/backend/category/get-categories.php'
            );
            const data = await response.json();
            const options = data.categories.map(([value, label]) => ({
                value,
                label,
            }));
            setCategories(options);
        };
        fetchCategories().then(() => {});
    }, []);

    useEffect(() => {
        const fetchFilteredShops = async () => {
            const response = await fetch(
                'http://localhost:8888/final-project/backend/shop/get-filtered-shops.php',
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({
                        distance,
                        categories: selectedCategories,
                        lat: currentLocation.lat,
                        lng: currentLocation.lng,
                    }),
                }
            );
            const data = await response.json();
            setShops(data.shops);
        };

        fetchFilteredShops().then(() => {});
    }, [distance, selectedCategories]);

    const handleCategoryChange = (selectedOptions) => {
        const values = selectedOptions.map((option) => parseInt(option.value));
        setSelectedCategories(values);
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

    const handleShowShopsCategories = (shopId) => {
        setDisableShowCategoriesButton(false);
        setSelectedShop(selectedShop === shopId ? null : shopId);
    }

    return (
        <div className={classes.filterWrapperDiv}>
            <div className={classes.distWrapperDiv}>
                <label>distance:</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={distance}
                    onChange={handleDistanceChange}
                />
                <span>{distance} km</span>
            </div>
            {categories.length > 0 ? (
                <Select
                    isMulti
                    placeholder={'Select categories...'}
                    options={categories}
                    onChange={handleCategoryChange}
                    value={categories.filter((option) =>
                        selectedCategories.includes(parseInt(option.value))
                    )}
                />
            ) : null}
            {shops && shops.map((shop, index) => (
                <div
                    onClick={() => props.setMapLocation([shop.lat, shop.lng])}
                    key={index}
                    className={classes.filteredShopWrapperDiv}>
                    <div className={classes.shop}>
                        <div className={classes.nameAddressWrapperDiv}>
                            <p>name: {shop.name}</p>
                            <p>address: {shop.address}</p>
                        </div>
                        <div className={classes.buttonsWrapperDiv}>
                            <button
                                onClick={() => handleShowShopsCategories(shop.id)}
                                disabled={disableShowCategoriesButton && selectedShop === shop.id}
                            >
                                categories
                            </button>
                        </div>
                    </div>
                    <div className={selectedShop === shop.id ? classes.dropdownWrapper : classes.dropdownClosedWrapper}>
                        {selectedShop === shop.id && <ShopCategories shopId={shop.id} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
