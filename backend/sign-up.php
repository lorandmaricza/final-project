<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Sign up</title>
</head>
<body>
<div class="signup-form">
    <form action="sign-up-process.php" method="post" enctype="multipart/form-data">
        <h1>Sign up</h1>
        <p>Create your account</p>
        <div>
            <input type="text" name="firstName" placeholder="First Name" required>
        </div>
        <div>
            <input type="text" name="lastName" placeholder="Last Name" required>
        </div>
        <div>
            <input type="email" name="email" placeholder="Email" required>
        </div>
        <div>
            <input type="password" name="password" placeholder="Password" required>
        </div>
        <div>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required>
        </div>
        <br>
        <div>
            <input type="radio" name="role" value="Consumer">
            <label for="css">consumer</label>
            <input type="radio" name="role" value="Supplier">
            <label for="html">supplier</label>
        </div>
        <br>
        <div>
            <button type="submit" name="save">Sign up</button>
        </div>
        <br>
        <div>Already have an account? <a href="login.php">Sign in</a></div>
    </form>
</div>
</body>
</html>
