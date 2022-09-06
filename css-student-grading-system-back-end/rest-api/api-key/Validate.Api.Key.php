<?php

    require_once("rest-api/libraries/pdo-mysql/PDO.MySql.php");
	 
	class Validate{
     //------------------------------------------------------------------------------------------------------------------------------		  
 	 
	     static function ApiKey($Identity, $ApiKey_Code)
		  {      
			  	 $Search_Key=  Array($ApiKey_Code, $Identity);
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call ApiKey_Validate(?,?)", $Search_Key);
		  
		      if ($Result=="[]"){ return "NOT REGISTERED"; }
		      else{ $Obj_Result = json_decode($Result);
				    return strtoupper($Obj_Result[0]->Status);}
		 }
	 //------------------------------------------------------------------------------------------------------------------------------		  
 
	}
	
	?>