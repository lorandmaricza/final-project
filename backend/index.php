<?php
session_start();

if(!isset($_SESSION['loggedIn'])) {
    // login.php: handle the sign-up
    header('Location: login.php');
} else {
    header('Location: profile.php');
}
die();