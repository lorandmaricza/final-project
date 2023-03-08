import React, {useEffect, useState} from "react";
import classes from "./AddShopForm.module.css"
import {fetchCategories} from '../utils/helpers';
import LoadingSpinner from "./LoadingSpinner";

export default function AddShopForm(props) {
    const [address, setAddress] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [showPredictions, setShowPredictions] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categoriesShop, setCategoriesShop] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [isCancelClicked, setIsCancelClicked] = useState(false);
    const [,setShop] = useState([]);
    const API_KEY = "AIzaSyAfpIVTNfec1GFO09qxmwXbu9fGV8t4glk";
    const isAdd = props.isAdd;
    const shopId = props.shopId ?? null;

    useEffect(() => {
        fetchCategories(setCategories).catch(() => {});
    }, []);

    useEffect(() => {
        isValidAddress(address).then(setIsValid);
    }, [address]);

    useEffect(() => {
        setIsAddButtonDisabled(checkedCategories.length === 0 || !isValid);
    }, [checkedCategories, isValid]);

    useEffect(() => {
        if (isCancelClicked) {
            setCheckedCategories([]);
            const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
            setIsCancelClicked(false);
        }
    }, [isCancelClicked]);

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
                setCategoriesShop(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        if (shopId !== null) {
            fetchShops().then(() => {});
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
            return data.status === "OK";
        } catch (e) {
            console.log(e);
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

    const handleAdd = async () => {
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

        props.onAdd({lat, lng, address, checkedCategories});
    };

    const handleCancel = () => {
        setAddress("");
        setIsCancelClicked(true);
    }

    const handleCategoryCheck = (e) => {
        let updatedList = [...checkedCategories];
        if (e.target.checked) {
            updatedList = [...checkedCategories, e.target.id];
        } else {
            updatedList.splice(checkedCategories.indexOf(e.target.id), 1);
        }
        setCheckedCategories(updatedList);
    };

    if (!categoriesShop) {
        return <LoadingSpinner />;
    }

    return (
        <div className={classes.wrapperDiv}>
            <input
                value={address}
                onChange={handleChange}
                placeholder="Search for a location"
                size="50"
            />
            {
                showPredictions && (
                    <ul>
                        {predictions.map((prediction) => (
                            <li
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
                            checked={categoriesShop.some((categoryShop) => categoryShop.id === parseInt(category[0]))}
                        />
                        <label htmlFor={category[1]}>{category[1]}</label>
                    </div>
                ))
            }
            {
                isAdd ? ( <button onClick={handleAdd} disabled={isAddButtonDisabled}>Add</button> ) : ( <button>Update</button> )
            }
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};
