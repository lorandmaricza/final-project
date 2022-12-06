<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
include 'login.php';
include 'database.php';

$emailPost = $_POST['email'];
$passwordPost = $_POST['password'];

$sql = 'SELECT id, first_name, last_name, password, role_id FROM users WHERE email = ?';
global $conn;

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $emailPost);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 1) {
    $stmt->bind_result($userId, $firstName, $lastName, $password, $userRoleId);
    $stmt->fetch();

    if ($passwordPost === $password) {
        session_regenerate_id();
        $_SESSION['loggedIn'] = true;
        $_SESSION['userId'] = $userId;
        $_SESSION['userRoleId'] = $userRoleId;
        $_SESSION['firstName'] = $firstName;
        $_SESSION['lastName'] = $lastName;
        header('Location: profile.php');
        die();
    } else {
        echo 'incorrect email or password';
    }
} else {
    echo 'incorrect email or password';
}

$stmt->close();


