<?php
session_start();

$DATABASE_HOST = '127.0.0.1';
$DATABASE_USER = 'root';
$DATABASE_PASS = 'root';
$DATABASE_NAME = 'project_db';
$DATABASE_PORT = 8889;
$conn = mysqli_connect(
    $DATABASE_HOST,
    $DATABASE_USER,
    $DATABASE_PASS,
    $DATABASE_NAME,
    $DATABASE_PORT
);

error_reporting(E_ALL);

if (!$conn) {
    die('Could not connect to the database: ' .
        mysqli_error($conn));
}

