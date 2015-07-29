<?php
/*
pb-sign-up.php
Copyright(c) 2015 O J Low
Version: 0.1 2015-05-19
Does the database work and returns an XML result

input post data:
u_name 	
u_email 	
u_country 	
u_postcode 	
u_username	
u_password 	
u_confirm_pw

AXAJ
return codes:

*/

//lookup postcode
if (isset($_POST['u_country'])){
 
}


$result = $_POST;
$result["success"]=0;


//return the result	
print_r($result);
?>
