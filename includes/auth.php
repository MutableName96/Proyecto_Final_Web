<?php
function registerUser($fullName, $email, $password, $phone, $address) {
    global $conn;
    
    // Sanitizar los datos para evitar inyecciones
    $fullName = htmlspecialchars(trim($fullName));
    $email = htmlspecialchars(trim($email));
    $password = trim($password); // La contraseña no se necesita sanitizar
    $phone = htmlspecialchars(trim($phone));
    $address = htmlspecialchars(trim($address));
    
    // Validar el email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false; // Email no válido
    }

    // Verificar si el email ya existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        return false; // Email ya registrado
    }
    
    // Insertar nuevo usuario
    try {
        // Hashear la contraseña con BCRYPT
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Preparar la consulta de inserción
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre_completo, email, password, telefono, direccion) VALUES (?, ?, ?, ?, ?)");
        
        // Ejecutar la inserción
        return $stmt->execute([$fullName, $email, $hashedPassword, $phone, $address]);
    } catch (PDOException $e) {
        // Loguear el error con más contexto
        error_log("Error al registrar el usuario con email $email: " . $e->getMessage());
        return false;
    }
}
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
error_log("Email recibido: " . $email); // Esto registrará el valor del email

?>
