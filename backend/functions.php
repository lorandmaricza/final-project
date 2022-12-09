<?php

function redirect($userRoleId) {
    if ($userRoleId === 1) {
        header('Location: profile.php');
    } else if ($userRoleId === 2) {
        header('Location: supplier-page.php');
    } else if ($userRoleId === 3) {
        header('Location: profile.php');
    }
}