import React, {useEffect, useState} from "react";
import classes from "./ManageShopForm.module.css"
import {fetchCategories} from '../utils/helpers';
import LoadingSpinner from "./LoadingSpinner";
import stringSimilarity from "string-similarity";

export default function ManageShopForm(props) {
    const [address, setAddress] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [showPredictions, setShowPredictions] = useState(true);
    const [categories, setCategories] = useState([]);
    const [shopCategories, setShopCategories] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedCategoriesAreInitial, setCheckedCategoriesAreInitial] = useState(true);
    const [initialAddress, setInitialAddress] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [isUpdateCategoriesButtonDisabled, setIsUpdateCategoriesButtonDisabled] = useState(true);
    const [isUpdateAddressButtonDisabled, setIsUpdateAddressButtonDisabled] = useState(true);
    const [isCancelButtonClicked, setIsCancelButtonClicked] = useState(false);
    const [,setShop] = useState([]);
    const API_KEY = "...";
    const isAdd = props.isAdd;
    const shopId = props.shopId ?? null;

    useEffect(() => {
        fetchCategories(setCategories).catch(() => {});
    }, []);

    useEffect(() => {
        setIsAddButtonDisabled(checkedCategories.length === 0 || !isValid);
    }, [checkedCategories, isValid]);

    useEffect(() => {
        isValidAddress(address).then(setIsValid);
    }, [address]);

    useEffect(() => {
        setIsUpdateCategoriesButtonDisabled(checkedCategoriesAreInitial);
    }, [checkedCategoriesAreInitial]);

    useEffect(() => {
        const isAddressInitial = address.trim() === initialAddress;
        setIsUpdateAddressButtonDisabled(!isValid || isAddressInitial);
    } , [address, initialAddress, isValid]);

    useEffect(() => {
        if (isCancelButtonClicked) {
            setCheckedCategories([]);
            const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
            setIsCancelButtonClicked(false);
        }
    }, [isCancelButtonClicked]);

    useEffect(() => {
         const fetchShops = async () => {
             try {
                const response = await fetch(
                    `http://localhost:8888/final-project/backend/shop/get-shop.php`,
                    {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        body: JSON.stringify({ shopId }),
                    }
                );
                const data = await response.json();
                setShop(data.shop);
                setAddress(data.shop.address);
                setInitialAddress(data.shop.address);
                setShopCategories(data.categories);
                return data.categories;
            } catch (error) {
                console.error(error);
            }
        };

        if (shopId !== null) {
            fetchShops().then((categoriesShop) => {
                setCheckedCategories(categoriesShop.map((category) => category.id.toString()));
            });
        }
    }, [shopId]);

    const isValidAddress = async (address) => {
        if (address === "") return false;

        let data;
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
            );
            data = await response.json();

            const formattedAddress = data.results[0].formatted_address;
            const similarityScore = stringSimilarity.compareTwoStrings(
                address.toLowerCase(),
                formattedAddress.toLowerCase()
            );
            const minimumScore = 0.8;
            return similarityScore >= minimumScore;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const handleSelect = async address => {
        setAddress(address);
        setShowPredictions(false);
    };

    const handleChange = async e => {
        setAddress(e.target.value);
        setShowPredictions(true);
        let data;
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${API_KEY}`
            );
            data = await response.json();
        } catch (e) {
            console.log(e);
        }
        setPredictions(data.predictions);
    };

    const handleAddShop = async () => {
        console.log('szoszi');
        let data;
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
            );
            data = await response.json();
        } catch (e) {
            console.log(e);
        }
        let { lat, lng } = data.results[0].geometry.location;

        props.onAddShop({lat, lng, address, checkedCategories});
    };

    const handleCancel = () => {
        setAddress("");
        setIsCancelButtonClicked(true);
    }

    const handleDelete = () => {
        props.onDeleteShop({shopId});
    }

    const handleUpdateAddress = async () => {
        let data;
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
            );
            data = await response.json();
        } catch (e) {
            console.log(e);
        }
        let { lat, lng } = data.results[0].geometry.location;

        props.onUpdateAddress({shopId, address, lat, lng});
    }

    const handleUpdateCategory = async () => {
        props.onUpdateCategory({shopId, checkedCategories});
    }

    const handleCategoryCheck = (e) => {
        let updatedList = [...checkedCategories];
        if (e.target.checked) {
            updatedList = [...checkedCategories, e.target.id];
        } else {
            updatedList.splice(checkedCategories.indexOf(e.target.id), 1);
        }
        setCheckedCategories(updatedList);

        let initialList = shopCategories.every((category) => updatedList.includes(category.id.toString()));
        if (initialList) {
            setCheckedCategoriesAreInitial(true);
        } else {
            setCheckedCategoriesAreInitial(false);
        }
    };

    if (!shopCategories) {
        return <LoadingSpinner />;
    }

    return (
        <div className={classes.wrapperDiv}>
            <input
                type="text"
                value={address}
                onChange={handleChange}
                placeholder="Search for a location"
                size="50"
            />
            {
                !isAdd && ( <button onClick={handleUpdateAddress} disabled={isUpdateAddressButtonDisabled}>Update address</button> )
            }
            {
                showPredictions && (
                    <ul className={classes.autocomplete}>
                        {predictions.map((prediction) => (
                            <li
                                className={classes.autocompleteItems}
                                key={prediction.place_id}
                                onClick={() => handleSelect(prediction.description)}
                            >
                                {prediction.description}
                            </li>
                        ))}
                    </ul>
                )
            }
            {
                categories.map((category) => (
                    <div>
                        <input
                            type="checkbox"
                            key={category[0]}
                            id={category[0]}
                            name={category[1]}
                            onChange={handleCategoryCheck}
                            checked={shopId && checkedCategories.some((categoryShop) => categoryShop === category[0])}
                        />
                        <label htmlFor={category[1]}>{category[1]}</label>
                    </div>
                ))
            }
            {
                isAdd ?
                    ( <button onClick={handleAddShop} disabled={isAddButtonDisabled}>Add</button> ) :
                    ( <button onClick={handleUpdateCategory} disabled={isUpdateCategoriesButtonDisabled}>Update categories</button> )
            }
            {
                isAdd ?
                    ( <button onClick={handleCancel}>Cancel</button> ) :
                    ( <button onClick={handleDelete}>Delete</button> )
            }
        </div>
    );
};
