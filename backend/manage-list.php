<?php

include 'database.php';

$categoryNames = [];

$sql1 = 'INSERT INTO listCategories (category_name) VALUES (?)';
$sql2 = 'SELECT * FROM listCategories';
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
?>

<!doctype html>
<html>
<head>
    <title>List management</title>
    <style>
        a {
            text-decoration: none !important;
        }

        table {
            margin-top: 20px;
            border-collapse: collapse;
            width: 50%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    </style>
</head>
<body>
    <a href="profile.php">go back</a>
    <h2>Manage the available categories of grocery goods: </h2>
    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
        <input type="submit" name="buttonAddCategory" value="Add Category">
    </form><br>
    <?php
    $result = $conn->query($sql2);
    if ($result->num_rows > 0) {
        echo "<table>";
        echo "<tr>";
        echo "<th>Category</th>";
        echo "<th>Update</th>";
        echo "<th>Delete</th>";
        echo "</tr>";
        while ($row = $result->fetch_assoc()) {
            $categoryNames[] = $row['category_name'];
            echo "<tr>";
            echo "<td>".$row['category_name']."</td>";
//            echo "<td><a href='update.php?id=".$row['id']."'>update</a>";
            echo "<td><a href=''>update</a>";
//            echo "<td><a href='delete.php?id=".$row['id']."'>delete</a>";
            echo "<td><a href=''>delete</a>";
            echo "</tr>";
        }
        echo "</table><br>";
        $result->free();
    } else {
        echo "Category not found.";
    }

    echo '<form action='.$_SERVER['PHP_SELF'].' method="post">';
    if (isset($_POST['buttonAddCategory'])
        && !(isset($_POST['buttonCancelAddNewCategory']))) {
        echo '<input type="text" name="categoryName" placeholder="Category Name">';
        echo '<input type="submit" name="buttonAddNewCategory" value="Add"/>';
        echo '<input type="submit" name="buttonCancelAddNewCategory" value="Cancel"/>';
    }
    echo '</form>';
    ?>
</body>
</html>