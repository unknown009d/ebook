<?php
$url = 'localhost';
$user = 'root';
$pass = '';
$database = 'ebook';
$cn = mysqli_connect($url, $user, $pass, $database) or die(mysqli_error($cn));
