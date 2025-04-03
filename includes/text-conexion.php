<?php
require_once __DIR__ . '/../includes/db.php';

try {
    $stmt = $conn->query("SELECT 1");
    echo "✅ Conexión exitosa a la BD";
} catch (PDOException $e) {
    die("❌ Error: " . $e->getMessage());
}