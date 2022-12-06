<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
include "sign-up.php";
include "database.php";

$firstNamePost = $_POST['firstName'];
$lastNamePost = $_POST['lastName'];
$emailPost = $_POST['email'];
$passwordPost = $_POST['password'];
$confirmPasswordPost = $_POST['confirmPassword'];

$sql1 = 'SELECT * FROM users WHERE email = ?';
$sql2 = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)';
$sql3 = 'SELECT id, role_id FROM users WHERE email = ?';
global $conn;

$stmt = $conn->prepare($sql1);
$stmt->bind_param('s', $emailPost);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo 'this email is taken by another account';
} else if ($passwordPost !== $confirmPasswordPost) {
    echo 'passwords do not match';
} else {
    $stmt = $conn->prepare($sql2);
    $stmt->bind_param('ssss', $firstNamePost, $lastNamePost, $emailPost, $passwordPost);
    if ($stmt->execute()) {
        $stmt = $conn->prepare($sql3);
        $stmt->bind_param('s', $emailPost);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($userId, $userRoleId);
        $stmt->fetch();
        $_SESSION['userId'] = $userId;
        $_SESSION['userRoleId'] = $userRoleId;
        $_SESSION['loggedIn'] = true;
        $_SESSION['firstName'] = $firstNamePost;
        $_SESSION['lastName'] = $lastNamePost;
        header('Location: profile.php');
    } else {
        echo "error: " . $conn->error;
    }
}

