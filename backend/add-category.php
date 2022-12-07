<?php

include 'database.php';
include 'manage-list.php';

$sql1 = 'INSERT INTO listCategories (category_name) VALUES (?)';
global $conn;


if (isset($_POST['buttonAddNewCategory'])) {
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('s', $_POST['categoryName']);
    try {
        $stmt->execute();
    } catch (Exception $e) {
        echo 'Category already added!<br>';
    }
}

echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
if (!(isset($_POST['buttonCancelAddNewCategory']))) {
    echo '<input type="text" name="categoryName" placeholder="Category Name">';
    echo '<input type="submit" name="buttonAddNewCategory" value="Add"/>';
    echo '<input type="submit" name="buttonCancelAddNewCategory" value="Cancel"/>';
}
echo '</form>';
