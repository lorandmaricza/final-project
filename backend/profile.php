<?php
session_start();

if (isset($_POST['buttonSignOut'])) {
    session_destroy();
    header('Location: login.php');
//    die();
} else if (isset($_POST['buttonManageList'])) {
    header('Location: manage-list.php');
}
?>

<!doctype html>
<html>
<head>
    <title>Profile</title>
</head>
<body>
<h1>Hello <?php echo $_SESSION['firstName'];?>!</h1>

<?php
switch ($_SESSION['userRoleId']) {
    case 1:
        echo "<h3>role: user</h3>";
        break;
    case 2:
        echo "<h3>role: admin</h3>";
        break;
    default:
        echo "<h3>role: undefined</h3>";
}

echo "your saved data in recent SESSION:<br>";
foreach($_SESSION as $key => $value) {
    echo $key . "=" . $value;
    echo "<br>";
}
echo "<br>";
?>

<form method="post">
    <?php
    if ($_SESSION['userRoleId'] === 2) {
        echo '<div><input type="submit" name="buttonManageList" value="manage list"/></div>';
    }
    ?>
    <div><input type="submit" name="buttonSignOut" value="sign out"/></div>
</form>
</body>
</html>