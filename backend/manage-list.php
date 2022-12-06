<?php

include 'database.php';

$categoryNames = [];

$sql1 = 'INSERT INTO listCategories (category_name) VALUES (?)';
$sql2 = 'SELECT * FROM listCategories';
$sql3 = 'SELECT category_id FROM listCategories WHERE category_name=?';
$sql4 = 'INSERT INTO listItems (item_name, category_id) VALUES (?,?)';
$sql5 = 'SELECT listItems.item_name, listCategories.category_name 
            FROM listItems, listCategories
                WHERE listItems.category_id=listCategories.category_id';
global $conn;


if (isset($_POST['buttonAddNewCategory'])) {
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('s', $_POST['categoryName']);
    $stmt->execute();
} else if (isset($_POST['buttonAddNewItem'])) {
//    Key=categories, Value=Dairy & Eggs
//    Key=itemName, Value=Egg
    $stmt = $conn->prepare($sql3);
    $stmt->bind_param('s', $_POST['categories']);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($categoryId);
    $stmt->fetch();

    $stmt = $conn->prepare($sql4);
    $stmt->bind_param('si', $_POST['itemName'], $categoryId);
    $stmt->execute();
}

$result = $conn->query($sql2);
while ($row = $result->fetch_assoc()) {
    $categoryNames[] = $row['category_name'];
}

$res = $conn->query($sql5);
while ($row = $res->fetch_assoc()) {
    var_dump($row);
}
echo '<br>';
//var_dump($categoryNames);
?>

<!doctype html>
<html>
<head>
    <title>List management</title>
    <style>

    </style>
</head>
<body>
    <a href="profile.php">go back</a>
    <h2>Manage the available categories of grocery goods: </h2>
    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
        <input type="submit" name="buttonAddCategory" value="Add Category">
        <input type="submit" name="buttonAddItem" value="Add Item">
    </form>
    <?php
    echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
    if (isset($_POST['buttonAddCategory'])) {
        echo '<input type="text" name="categoryName" placeholder="Category Name" required>';
        echo '<input type="submit" name="buttonAddNewCategory" value="Add"/>';
    } else if (isset($_POST['buttonAddItem'])) {
        echo '<label for="categories">Choose a category:</label>';
        echo '<select name="categories">';
        foreach ($categoryNames as $categoryName) {
            echo '<option value="'.$categoryName.'">'.$categoryName.'</option>';
        }
        echo '</select>';
        echo '<input type="text" name="itemName" placeholder="Item Name" required>';
        echo '<input type="submit" name="buttonAddNewItem" value="Add"/>';
    }
    echo '</form>';

//    $res = $conn->query($sql5);
//    var_dump($res);
//    while ($res->fetch_array()) {
//        echo $res;
//    }
    ?>
</body>
</html>