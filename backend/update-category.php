<?php
include 'database.php';
include 'cors.php';
global $conn;

$data = json_decode(file_get_contents('php://input'), true);
$category_name = $data['inputCategory'];
$category_id = $data['updateCategoryId'];

$sql = "UPDATE listCategories SET category_name = ? WHERE category_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $category_name, $category_id);
try {
    $stmt->execute();
    echo json_encode(['status' => 'success', 'message' => 'Category successfully updated']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e]);
}
exit();

