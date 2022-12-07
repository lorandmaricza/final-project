<?php

include 'database.php';

$categoryNames = [];

$sql = 'SELECT * FROM listCategories';
global $conn;
?>

<!doctype html>
<html lang="en">
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
    <button><a href="add-category.php">Add Category</a></button>
    <?php
    $result = $conn->query($sql);
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
            echo "<td><a href='update-category.php?id=".$row['category_id']."'>update</a>";
//            echo "<td><a href=''>update</a>";
            echo "<td><a href='delete-category.php?id=".$row['category_id']."'>delete</a>";
//            echo "<td><a href='delete-category.php'>delete</a>";
            echo "</tr>";
        }
        echo "</table><br>";
        $result->free();
    } else {
        echo "Category not found.";
    }
    ?>
</body>
</html>