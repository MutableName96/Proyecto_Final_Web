<?php
// pages/register.php

session_start();

// Incluir la función de registro
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener los datos del formulario (coincidiendo con los name del HTML)
    $fullName = $_POST['full-name'] ?? '';
    $email    = $_POST['email']     ?? '';
    $password = $_POST['password']  ?? '';
    $phone    = $_POST['phone-number'] ?? '';
    $address  = $_POST['address']   ?? '';

    // Llamar a la función de registro
    if (registerUser($fullName, $email, $password, $phone, $address)) {
        // Registro exitoso: redirigir a login.php
        header("Location: login.php");
        exit;
    } else {
        // Error en el registro
        echo "<p style='color:red;'>Hubo un problema al registrar el usuario. Intenta nuevamente.</p>";
    }
}
