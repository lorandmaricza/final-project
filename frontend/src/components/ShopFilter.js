import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function ShopFilter({ onChange }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [distance, setDistance] = useState(1);

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

    const handleCategoryChange = (selectedOptions) => {
        const values = selectedOptions.map((option) => option.value);
        setSelectedCategories(values);
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

    const handleFilterClick = () => {
        onChange({ distance, categories: selectedCategories });
    }

    return (
        <div>
            <label>Kilometer Range Filter:</label>
            <input type="range" min="1" max="10" value={distance} onChange={handleDistanceChange} />
            <span>{distance} km</span>
            <br />
            <Select
                isMulti
                placeholder={'Select categories...'}
                options={categories}
                onChange={handleCategoryChange}
                value={categories.filter((option) =>
                    selectedCategories.includes(option.value)
                )}
            />
            <button onClick={handleFilterClick}>Filter</button>
        </div>
    );
}