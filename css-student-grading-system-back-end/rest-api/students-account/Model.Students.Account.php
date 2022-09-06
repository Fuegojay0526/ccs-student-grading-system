<?php
	
	require_once("../configuration/Configuration.php");
    require_once("../libraries/pdo-mysql/PDO.MySql.php");
	require_once("../libraries/security/Cryptography.Hashing.php");
 
	class Student_Account{
			  
		static function LoginStudent($Record)
		  {    
		         $Record->Password = Cryptography::EncryptData($Record->Password, Configuration::$Cipher["Key"]);
		      	 $Login=  Array($Record->Username, $Record->Password);
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call StudentsAccount_Login(?,?)", $Login);
		 
		  if ($Result=="[]"){
			 echo json_encode(Array("Status"=> "Error: The User's Account was not found or Inactive."));
	       }
		 else{       
				    $Obj_Result = json_decode($Result);
				    $Obj_Result[0]->Students_Info->Record_ID = $Obj_Result[0]->Record_ID;
					$Obj_Result[0]->Students_Info->Identity = $Obj_Result[0]->Identity;
					
				    echo  json_encode($Obj_Result[0]->Students_Info);
				}
		  }	
     //End of Function LoginStudent	  
		static function ChangePassword($Record)
		  {     
		         $Record->NewPassword = Cryptography::EncryptData($Record->NewPassword, Configuration::$Cipher["Key"]);
				 $Record->OldPassword = Cryptography::EncryptData($Record->OldPassword, Configuration::$Cipher["Key"]);
		         $Data=  Array($Record->Username, $Record->OldPassword);
		         
				 
				 $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call StudentsAccount_Login(?,?)", $Data);
		 
		      if ($Result=="[]"){
				    echo json_encode(Array("Status"=> "Error: The User's current password does not match to their record."));
					return;
	              }
		    else{   $Data=  Array($Record->RecordID, $Record->NewPassword); 
				    $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call StudentsAccount_UpdatePassword(?,?)", $Data);
		             echo json_encode(Array("Status"=> "New Password was successfully Applied")); 
				}
				
		 }
				 
	 //End of function ChangePassword	    
		  
	}
	
	?>