import React, { useState, useEffect } from 'react';

export default function ShopCategories({ shopId }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8888/final-project/backend/category/get-users-shop-categories.php`,
                    {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                        body: JSON.stringify({ shopId }),
                    }
                );
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories().then(() => {});
    }, [categories, shopId]);

    return (
        <ul>
            {categories && categories.map((category) => <li key={category.id}>{category.name}</li>)}
        </ul>
    );
}
