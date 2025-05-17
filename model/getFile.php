<?php
include 'connect.php';
$sql = "select * from books";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
$c = mysqli_num_rows($result);
if ($c > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
} else {
    $output[] = "NoData";
}

echo json_encode($output);

mysqli_close($cn);
