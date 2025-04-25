<?php
// db.php

$host = 'localhost';  // Dirección del servidor MySQL
$dbname = 'hatgap_db'; // Nombre de la base de datos
$username = 'root'; // Usuario de MySQL
$password = ''; // Contraseña de MySQL

try {
    // Conexión a la base de datos con la configuración del charset UTF-8
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);

    // Configuración para manejo de errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
