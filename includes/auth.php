<?php
// includes/auth.php

// Incluir la conexión PDO
require_once __DIR__ . '/db.php';

/**
 * Registra un nuevo usuario.
 * 
 * @param string $fullName
 * @param string $email
 * @param string $password
 * @param string $phone
 * @param string $address
 * @return bool True si se registró correctamente, false en caso contrario.
 */
function registerUser($fullName, $email, $password, $phone, $address) {
    global $pdo; // Usamos $pdo, no $conn

    // Sanitizar datos
    $fullName = htmlspecialchars(trim($fullName));
    $email    = htmlspecialchars(trim($email));
    $password = trim($password);
    $phone    = htmlspecialchars(trim($phone));
    $address  = htmlspecialchars(trim($address));

    // Validar email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email inválido.";
        return false;
    }

    // Verificar si el email ya está registrado
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo "El correo ya está registrado.";
        return false; // Ya existe
    }

    // Hashear la contraseña
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insertar nuevo usuario (usamos 'username' en lugar de 'nombre_completo')
    try {
        $stmt = $pdo->prepare(
            "INSERT INTO usuarios (username, email, password, phone, address) 
             VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([$fullName, $email, $hashedPassword, $phone, $address]);
        return true;
    } catch (PDOException $e) {
        echo "Error al registrar usuario: " . $e->getMessage(); // Mostrar el error
        return false;
    }
}
