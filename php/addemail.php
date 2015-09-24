<?php
function mysql_insert($table, $inserts) {
    $values = array_map('mysql_real_escape_string', array_values($inserts));
    $keys = array_keys($inserts);
       
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')');
}



$emailAddr = strtolower($_REQUEST['email']);

echo "Email:".$emailAddr."<br/>";

//BOC: storing in databse
$db_host="localhost";
$db_user="eve202_zumbafest";
$db_pass="eventsteam202A";

//echo date("Y-M-d H:i:s")."<br/>";


$conn=mysql_connect($db_host,$db_user,$db_pass) or die("cannot connect!".mysql_error());
$db=mysql_select_db("eve202_zumbafest",$conn);

$sql="select id,email,notification_count,date_created from leads";

$rs=mysql_query($sql);

//checking if email exists
$is_existing=false;
while ($row = mysql_fetch_array($rs, MYSQL_NUM)) {
   // printf("ID: %s,email: %s,notification_count: %s,date_created: %s<br/>", $row[0], $row[1],$row[2],$row[3]);  
	if(trim($row[1])==trim($emailAddr)){
		$is_existing=true;
	}
}


if($is_existing==false){
	mysql_insert('leads',array(
		'email'=>$emailAddr,
		'notification_count'=>0,
		'date_created'=>date("Y-m-d H:i:s")
		)
	);
}

mysql_free_result($rs);

//EOC: Storing in databse

/*
//BOC: storing in JSON file
$inp = file_get_contents('../json/emails.json');
$tempArray = json_decode($inp);




if(!in_array($emailAddr,$tempArray)){
	array_push($tempArray, $emailAddr);
	$jsonData = json_encode($tempArray);
	file_put_contents('../json/emails.json', $jsonData);
}*/

?>