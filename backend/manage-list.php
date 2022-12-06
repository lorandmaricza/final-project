<?php

include 'database.php';

$categoryNames = [];

$sql1 = 'INSERT INTO listCategories (category_name) VALUES (?)';
$sql2 = 'SELECT * FROM listCategories';
global $conn;


if (isset($_POST['buttonAddNewCategory'])) {
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('s', $_POST['categoryName']);
    $stmt->execute();
}

$result = $conn->query($sql2);
while ($row = $result->fetch_assoc()) {
    $categoryNames[] = $row['category_name'];
}

echo '<br>';
var_dump($categoryNames);
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
    </form>
    <?php
    echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
    if (isset($_POST['buttonAddCategory'])) {
        echo '<input type="text" name="categoryName" placeholder="Category Name" required>';
        echo '<input type="submit" name="buttonAddNewCategory" value="Add"/>';
    }
    echo '</form>';
    ?>
</body>
</html>