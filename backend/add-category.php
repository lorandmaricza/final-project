<?php
include 'database.php';
include 'cors.php';
global $conn;

$data = json_decode(file_get_contents('php://input'), true);
$category_name = $data['categoryName'];

$sql = 'INSERT INTO listCategories (category_name) VALUES (?)';

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $category_name);
try {
    $stmt->execute();
    echo json_encode(['status' => 'success', 'message' => 'Category successfully added']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e]);
}
exit();



