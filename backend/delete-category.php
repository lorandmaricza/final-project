<?php

include 'database.php';
include 'manage-list.php';

$sql = "DELETE FROM listCategories WHERE category_id = ?";
global $conn;

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $_GET['id']);
$stmt->execute();

header('Location: manage-list.php');
