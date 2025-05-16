<?php
session_start(); // Iniciar sesión

// Si se accede por GET, redirigir al formulario de login
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: login.html");
    exit();
}

// Incluir la conexión a la base de datos
include '../includes/db.php'; 

// Si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validar si el correo electrónico y la contraseña no están vacíos
    if (empty($email) || empty($password)) {
        echo "Por favor, complete todos los campos.";
        exit;
    }

    // Preparar la consulta para verificar si el usuario existe
    $stmt = $pdo->prepare("SELECT id, email, password, username FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(); // Obtenemos el resultado

    // Si el usuario existe
    if ($user) {
        // Verificar si la contraseña ingresada coincide con el hash almacenado
        if (password_verify($password, $user['password'])) {
            // Si la contraseña es correcta, iniciar sesión
            $_SESSION['usuario_id'] = $user['id'];
            $_SESSION['usuario_email'] = $user['email'];
            $_SESSION['usuario_nombre'] = $user['username'];

            // Redirigir a la página principal
            header("Location: ../index.php");
            exit();
        } else {
            // Contraseña incorrecta
            echo "La contraseña es incorrecta.";
        }
    } else {
        // Usuario no encontrado
        echo "El correo electrónico no está registrado.";
    }

    // No es necesario llamar a close() en PDOStatement
    $stmt = null; // Puedes dejar que PHP se encargue de liberar la memoria
}

$pdo = null; // Cerrar la conexión PDO
?>
