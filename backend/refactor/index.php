<?php
session_start();

// loggedIn is not needed: if user set into session insted??
if(!isset($_SESSION['loggedIn'])) {
    // login.php: handle the sign-up
    header('Location: login.php');
} else {
    header('Location: profile.php');
}
die();