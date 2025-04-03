<?php
// Iniciar sesión y conectar a la base de datos
session_start();
require_once __DIR__ . '/../includes/db.php';  // Asegúrate de que esta ruta sea correcta
require_once __DIR__ . '/../includes/auth.php'; // Si es necesario para tu lógica

// Verificar la conexión a la base de datos
if (!isset($pdo)) {
    die("La conexión a la base de datos no se ha establecido correctamente.");
}

// Inicializar variables con valores por defecto
$error = $success = '';
$formData = [
    'full-name' => '',
    'email' => '',
    'password' => '',
    'phone-number' => '',
    'address' => ''
];

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData = [
        'full-name' => trim($_POST['full-name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'password' => $_POST['password'] ?? '',
        'phone-number' => trim($_POST['phone-number'] ?? ''),
        'address' => trim($_POST['address'] ?? '')
    ];

    // Validaciones
    if (empty($formData['full-name']) || empty($formData['email']) || empty($formData['password'])) {
        $error = "Nombre, email y contraseña son obligatorios";
    } elseif (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        $error = "El formato del email no es válido";
    } elseif (strlen($formData['password']) < 6) {
        $error = "La contraseña debe tener al menos 6 caracteres";
    } else {
        // Verificar si el correo electrónico ya está registrado
        $query = "SELECT COUNT(*) FROM usuarios WHERE email = :email";
        $stmt = $pdo->prepare($query);
        $stmt->execute(['email' => $formData['email']]);
        $count = $stmt->fetchColumn(); // Obtiene el número de filas encontradas

        if ($count > 0) {
            // Si el correo ya está registrado
            $error = "El email ya está registrado";
        } else {
            // Si el correo no está registrado, proceder con el registro
            $query = "INSERT INTO usuarios (full_name, email, password, phone_number, address) VALUES (:full_name, :email, :password, :phone_number, :address)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                'full_name' => $formData['full-name'],
                'email' => $formData['email'],
                'password' => password_hash($formData['password'], PASSWORD_DEFAULT), // Hashea la contraseña
                'phone_number' => $formData['phone-number'],
                'address' => $formData['address']
            ]);
            $success = "¡Registro exitoso! Redirigiendo...";
            header("Refresh: 2; url=../index.php"); // Redirige al inicio
            exit();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/hatgap/css/register-style.css" />
    <title>Registro | HatGap</title>
</head>

<body>
    <div class="register-card">
        <div class="left-size">
            <a href="../index.php"><img src="../assets/images/Logos-HatGap/logo-FFFFFF.png" alt="Logo"
                    id="logo-1" /></a>
        </div>
        <div class="right-size">
            <form id="mainForm" method="POST" action="register.php">
                <div class="right-size-header">
                    <h1>Bienvenido a <span>HatGap</span></h1>
                    <a href="../index.php"><img src="../assets/images/circle-x.svg" alt="Cerrar" /></a>
                </div>

                <!-- Mensajes de error y éxito -->
                <?php if ($error): ?>
                    <div class="error-message"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <?php if ($success): ?>
                    <div class="success-message"><?= htmlspecialchars($success) ?></div>
                <?php endif; ?>

                <form id="mainForm" method="POST" action="register.php">
    <!-- Campo Nombre -->
    <div class="form-login">
        <input type="text" placeholder=" " name="full-name" value="<?= htmlspecialchars($formData['full-name']) ?>" />
        <div class="label-wrap">
            <img src="../assets/icons/register-login-icons/user.png" alt="Nombre" class="icon-label">
            <div class="labelname">Nombre</div>
        </div>
    </div>

    <!-- Campo Email -->
    <div class="form-login">
        <input type="text" placeholder=" " name="email" value="<?= htmlspecialchars($formData['email']) ?>" />
        <div class="label-wrap">
            <img src="../assets/icons/register-login-icons/mail.png" alt="Email" class="icon-label">
            <div class="labelname">Correo Electrónico</div>
        </div>
    </div>

    <!-- Campo Contraseña -->
    <div class="form-login">
        <input type="password" placeholder=" " name="password" />
        <div class="label-wrap">
            <img src="../assets/icons/register-login-icons/lock-keyhole.png" alt="Contraseña" class="icon-label">
            <div class="labelname">Contraseña</div>
        </div>
    </div>

    <!-- Campo Teléfono -->
    <div class="form-login">
        <input type="text" id="phone" name="phone-number" maxlength="10" required placeholder=" " value="<?= htmlspecialchars($formData['phone-number']) ?>" />
        <div class="label-wrap">
            <img src="../assets/icons/register-login-icons/phone.png" alt="Teléfono" class="icon-label">
            <div class="labelname">Teléfono</div>
            <div id="char-count">0/10</div>
        </div>
    </div>

    <!-- Campo Dirección -->
    <div class="form-login">
        <input type="text" placeholder=" " name="address" value="<?= htmlspecialchars($formData['address']) ?>" />
        <div class="label-wrap">
            <img src="../assets/icons/register-login-icons/map-pin-house.png" alt="Dirección" class="icon-label">
            <div class="labelname">Dirección</div>
        </div>
    </div>

    <!-- Enlace para iniciar sesión -->
    <div class="logIn">
        <p>¿Ya tienes una cuenta? <a href="../pages/login.php">Inicia sesión</a></p>
    </div>

    <!-- Botón para enviar -->
    <div class="form-button">
        <button type="submit">Registrarse</button>
    </div>
</form>

            </form>
        </div>
    </div>

    <script src="/js/length-number.js"></script>
</body>

</html>
