<?php
// Sample vulnerable login snippet (for educational use only)
$user = $_POST['user'] ?? '';
$pass = $_POST['pass'] ?? '';
if ($user === 'admin' && $pass === 'secret') {
  echo 'Login successful!';
} else {
  echo 'Invalid credentials';
}
