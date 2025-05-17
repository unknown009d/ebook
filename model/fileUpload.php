<?php
include "connect.php";
$target = '../resources/' . basename($_FILES["inpFile"]["name"]);
$caption = $_POST['caption'];
if (move_uploaded_file($_FILES["inpFile"]["tmp_name"], $target)) {
  $location = substr($target, 3);
  if (mysqli_query($cn, "INSERT INTO books (caption, location) VALUES (\"" . $caption . "\",\"" . $location . "\")")) {
    echo "File Uploaded !";
  } else {
    echo "File Uploaded on the Server but Not Updated in the Database !";
  }
} else {
  echo "File Not Uploaded !";
}
mysqli_close($cn);
