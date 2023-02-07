import React, { useState, useEffect } from 'react';
import classes from './ManageCategories.module.css';

function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [inputCategory, setInputCategory] = useState("");
    const [updateCategoryId, setUpdateCategoryId] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('http://localhost:8888/final-project/backend/get-categories.php', {
                method: "POST",
                mode: "cors",
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! message: ${response.message}`);
            }

            const data = await response.json();
            if (data.status === 'success') {
                setCategories(data.categories);
            } else {
                console.log('sth wrong');
            }
        }

        fetchCategories().catch(error => console.log(error));
    }, [categories]);

    const loadUpdateCategory = (categoryId, categoryName) => {
        setUpdateCategoryId(categoryId);
        setInputCategory(categoryName);
    }

    const handleUpdateCategory = () => {
        fetch('http://localhost:8888/final-project/backend/update-category.php', {
                    method: 'POST',
                    body: JSON.stringify({ updateCategoryId, inputCategory }),
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch((error) => console.log(error));

        setUpdateCategoryId(false);
    }

    const handleCancel = () => {
        setUpdateCategoryId(null);
        setInputCategory('');
    }

    const handleDeleteCategory = (category_id) => {
        fetch('http://localhost:8888/final-project/backend/delete-category.php', {
            method: 'POST',
            body: JSON.stringify({ category_id }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.log(error));
    }

    const handleAddCategory = () => {
        fetch("http://localhost:8888/final-project/backend/add-category.php", {
            method: "POST",
            body: JSON.stringify({ categoryName: inputCategory }),
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories([...categories]);
                setInputCategory("");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={classes.wrapperDiv}>
            <h2>Manage the available categories of grocery goods: </h2>
            <div className={classes.inputWrapper}>
                <input
                    className={classes.inputCategory}
                    placeholder='category'
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)}
                />
                {
                    updateCategoryId ?
                    <div className={classes.buttonsWrapperDiv}>
                        <button onClick={handleUpdateCategory} className={classes.buttons}>Update Category</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div> :
                    <button onClick={handleAddCategory} className={classes.buttons}>Add Category</button>
                }
            </div>
            <table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category[0]}>
                        <td>{category[1]}</td>
                        <td><button onClick={() => loadUpdateCategory(category[0], category[1])}>update</button></td>
                        <td><button onClick={() => handleDeleteCategory(category[0])}>delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageCategories;