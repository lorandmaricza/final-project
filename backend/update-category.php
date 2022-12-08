<?php
include 'database.php';
include 'manage-list.php';

$sql1 = "SELECT * FROM listCategories WHERE category_id = ?";
$sql2 = "UPDATE listCategories SET category_name = ? WHERE category_id = ?";
global $conn;

if (isset($_POST['buttonUpdateCategory'])) {
    $stmt = $conn->prepare($sql2);
    $stmt->bind_param('ss', $_POST['categoryName'], $_POST['categoryId']);
    $stmt->execute();
    header('Location: manage-list.php');
} else {
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('s', $_GET['id']);
    $stmt->execute();
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();

    echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
    if (!(isset($_POST['buttonCancelUpdateCategory']))) {
        echo '<input type="text" name="categoryName" placeholder="Category Name" value="';
        echo $row['category_name'];
        echo '">';
        echo '<input type="submit" name="buttonUpdateCategory" value="Update"/>';
        echo '<input type="hidden" name="categoryId" value="'.$_GET['id'].'">';
        echo '<input type="submit" name="buttonCancelUpdateCategory" value="Cancel"/>';
    } else {
        header('Location: manage-list.php');
    }
    echo '</form>';
}

