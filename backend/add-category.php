<?php

include 'database.php';
include 'manage-list.php';

$sql = 'INSERT INTO listCategories (category_name) VALUES (?)';
global $conn;

$exception = null;

if (isset($_POST['buttonAddNewCategory'])) {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_POST['categoryName']);
    try {
        $stmt->execute();
    } catch (Exception $e) {
        echo 'Category already added!<br>';
        $exception = $e;
    }

    if (is_null($exception)) {
        header('Location: manage-list.php');
    }
}

echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
if (!(isset($_POST['buttonCancelAddNewCategory']))) {
    echo '<input type="text" name="categoryName" placeholder="Category Name">';
    echo '<input type="submit" name="buttonAddNewCategory" value="Add"/>';
    echo '<input type="submit" name="buttonCancelAddNewCategory" value="Cancel"/>';
}
echo '</form>';
