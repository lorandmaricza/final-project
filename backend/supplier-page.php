<?php
session_start();

if (isset($_POST['buttonSignOut'])) {
    session_destroy();
    header('Location: login.php');
} else if (isset($_POST['buttonManageMap'])) {
    header('Location: map.php');
} else if (isset($_POST['buttonHideMap'])) {
    header('Location: supplier-page.php');
}
?>

<!doctype html>
<html lang="en">
<head>
    <title>Profile</title>
</head>
<body>
<h1>Hello <?php echo $_SESSION['firstName'];?>!</h1>

<?php
echo '<h3>role: ' . $role = $_SESSION['userRoleId'] == 2 ? 'supplier</h3>' : 'wrong!</h3>';

echo "your saved data in recent SESSION:<br>";
foreach($_SESSION as $key => $value) {
    echo $key . "=" . $value;
    echo "<br>";
}
echo "<br>";
?>

<form method="post">
    <div><input type="submit" name="buttonManageMap" value="Manage Map"/><input type="submit" name="buttonHideMap" value="Hide Map"/></div>
    <div><input type="submit" name="buttonSignOut" value="Sign Out"/></div>
</form>
</body>
</html>
