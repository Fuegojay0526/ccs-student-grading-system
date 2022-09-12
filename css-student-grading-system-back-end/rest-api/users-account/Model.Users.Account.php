<?php
	
	require_once("../configuration/Configuration.php");
    require_once("../libraries/pdo-mysql/PDO.MySql.php");
	require_once("../libraries/security/Cryptography.Hashing.php");
 
	class Users_Account{
		 
		static function UpdateRecord($Record)
		  {  $MyUserID = $Record->RecordID;
		     $Record->Password = Cryptography::EncryptData($Record->Password, Configuration::$Cipher["Key"]);
			  
		     unset($Record->RecordID);
			 
		     date_default_timezone_set(Configuration::$Server["TimeZone"]);
             $Time_Stamp = date("Y-m-d H:i:s",time());
		     $Result="";
		     
			     //Check Username and Email Address for new Record
				 
				 if($MyUserID==0)
				   { $Search_Key=  Array(0, trim($Record->Username) , trim($Record->EmailAddress));
		             $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_Search(?,?,?)", $Search_Key);
				   }
		  
		   if ($Result!="[]" && $MyUserID==0){
			  echo json_encode(Array("Status"=> "Error: The Email Address or Username you entered is already being used. "));
			  return;
	         }
		   else{   
		         // Save or Update Record
			     $MyRecord = Array($MyUserID, json_encode($Record),  $Time_Stamp);
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_Update(?,?,?)", $MyRecord);
	         
			      if($MyUserID>=1000)
			       {$Result='{"Record_ID":' . $MyUserID. '}';}
			      else{  $MyUserID = json_decode($Result)[0]->Record_ID;
					     $Result='{"Record_ID":' . $MyUserID .'}';
				      }
					  
					   echo $Result;
					   //Create Record Identity
				      $Identity = $MyUserID . "ASJ-" . $MyUserID . "RAC-" . $MyUserID . "JMS-" . $MyUserID . "BAR-" . $MyUserID . "KJS";
				      $Identity = Cryptography::SHA256_Hashing(Configuration::$Cipher["Identity_HashDifficulty"], $Identity, Configuration::$Cipher["Key"]);
					  $Identity=  Array( $MyUserID, $Identity);
					  
				      $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_UpdateIdentity(?,?)",  $Identity );
                  }
				
			  }
			  
     //------------------------------------------------------------------------------------------------------------------------------		  
		static function SearchRecord($Record)
		  {      
		    $SearchKey =$Record->SearchKey;
			  	 $Search_Key=  Array(intval($SearchKey), strval($SearchKey), strval($SearchKey));
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_Search(?,?,?)", $Search_Key);
		 
		   if ($Result=="[]"){
			  echo json_encode(Array("Status"=> "Error: The requested record was not found. \n Search Key: $SearchKey"));
	         }
		   else{   
			    $Obj_Result = json_decode($Result);
			    $Obj_Result[0]->Users_Info->Record_ID = $Obj_Result[0]->Record_ID;
			    $Obj_Result[0]->Users_Info->Password = Cryptography::DecryptData($Obj_Result[0]->Users_Info->Password, Configuration::$Cipher["Key"]);
				
				 echo  json_encode($Obj_Result[0]->Users_Info);
				}
			  }
	 //------------------------------------------------------------------------------------------------------------------------------		  
		static function LoginUser($Record)
		  {    
		         $Record->Password = Cryptography::EncryptData($Record->Password, Configuration::$Cipher["Key"]);
		      	 $Login=  Array($Record->Username, $Record->Password);
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_Login(?,?)", $Login);
		 
		  if ($Result=="[]"){
			 echo json_encode(Array("Status"=> "Error: The User's Account was not found or Inactive."));
	       }
		 else{       
				    $Obj_Result = json_decode($Result);
				    $Obj_Result[0]->Users_Info->Record_ID = $Obj_Result[0]->Record_ID;
					$Obj_Result[0]->Users_Info->Identity = $Obj_Result[0]->Identity;
					
				    echo  json_encode($Obj_Result[0]->Users_Info);
				}
		  }	
     //------------------------------------------------------------------------------------------------------------------------------		  
		static function ChangePassword($Record)
		  {     
		         $Record->NewPassword = Cryptography::EncryptData($Record->NewPassword, Configuration::$Cipher["Key"]);
				 $Record->OldPassword = Cryptography::EncryptData($Record->OldPassword, Configuration::$Cipher["Key"]);
		         $Data=  Array($Record->Username, $Record->OldPassword);
		         
				  
				 $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_Login(?,?)", $Data);
		 
		      if ($Result=="[]"){
				    echo json_encode(Array("Status"=> "Error: The User's current password does not match to their record."));
					return;
	              }
		    else{   $Data=  Array($Record->RecordID, $Record->NewPassword); 
				    $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_UpdatePassword(?,?)", $Data);
		             echo json_encode(Array("Status"=> "New Password was successfully Applied")); 
				}
				
		 }
				 
	 //------------------------------------------------------------------------------------------------------------------------------		  
		static function UsersList()
		  {  $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call UsersAccount_List()");
		 
		  if ($Result=="[]"){
			 echo json_encode(Array("Status"=> "Error: No Record Found."));
	       }
		 else{ echo $Result; }
		  }
		  
	 //------------------------------------------------------------------------------------------------------------------------------	  
		  
	}
	
	?>