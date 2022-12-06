<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Login</title>
</head>
<body>
<div class="login">
    <h1>Login</h1>
    <form action="login-process.php" method="post">
        <div>
            <input type="text" name="email" placeholder="Email" required>
        </div>
        <div>
            <input type="password" name="password" placeholder="Password" required>
        </div>
        <br>
        <input type="submit" value="Login">
    </form>
    <p>Don't have an account? <a href="sign-up.php">Sign up</a></p>
</div>
</body>
</html>