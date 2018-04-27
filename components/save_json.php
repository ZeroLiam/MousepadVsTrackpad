<?php
$myFile = "general.json";
$fh = fopen($myFile, 'a') or die("can't open file");
$stringData = $_POST["data"];
echo $stringData;
fwrite($fh, "\n". $stringData);
fclose($fh)
?>
