<?php
session_start();
require_once 'C:/xampp/htdocs/hatgap/includes/db.php';
require_once __DIR__ . '/../includes/auth.php';

$error = '';

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        $error = "Email y contraseña son obligatorios";
    } else {
        if (login($email, $password)) {
            // Redirigir al dashboard después del login exitoso
            header("Location: ../dashboard.php");
            exit();
        } else {
            $error = "Credenciales incorrectas";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/login-style.css" />
    <link rel="stylesheet" href="../css/normalize.css" />
    <title>Iniciar sesión | HatGap</title>
</head>

<body>
    <div class="login-card">
        <div class="left-size">
            <div class="left-size-header">
                <a href="../index.php"><img src="../assets/images/Logos-HatGap/logo-FFFFFF.png" alt="HatGap Logo" id="logo-1" /></a>
            </div>
            <h1>For the few<span>, </span>not for the many<span>.</span></h1>
        </div>

        <div class="right-size">
            <div class="right-size-header">
                <h1>HatGap</h1>
                <a href="../index.php"><img src="../assets/images/circle-x.svg" alt="Cerrar" /></a>
            </div>
            <div class="bow">
                <h2>Hola, bienvenido de nuevo <span>👋</span></h2>
            </div>

            <?php if ($error): ?>
                <div class="error-message">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <!-- Formulario principal ÚNICO -->
            <div class="form-login">
                <form action="">
                    <input type="text" placeholder="" name="full-name" />
                    <div class="label-wrap">
                        <img src="../assets/icons/register-login-icons/mail.png" alt="label-icon" class="icon-label" />
                        <div class="labelname">Email</div>
                    </div>
                </form>
            </div>

            <div class="form-login">
                <form action="">
                    <input type="password" placeholder="" name="full-name" />
                    <div class="label-wrap">
                        <img src="../assets/icons/register-login-icons/lock-keyhole.png" alt="label-icon" class="icon-label" />
                        <div class="labelname">Password</div>
                    </div>
                </form>
            </div>

                <div class="regis-log">
                    <a href="../pages/register.php">Registrarse</a>
                    <div class="logs-in">
                        <a href="#"><img src="../assets/images/icon-google.png" alt="Google" /></a>
                        <a href="#"><img src="../assets/images/icon-facebook.png" alt="Facebook" /></a>
                    </div>
                </div>

                <div class="form-button">
                    <button type="submit">Iniciar sesión</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>