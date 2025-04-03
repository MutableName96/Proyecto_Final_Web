<?php
// db.php

$host = 'localhost';  // Dirección del servidor MySQL
$dbname = 'hatgap_db'; // Nombre de la base de datos
$username = 'root'; // Usuario de MySQL
$password = ''; // Contraseña de MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Configuración para manejo de errores
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
