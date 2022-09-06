<?php
	
	require_once("../configuration/Configuration.php");
    require_once("../libraries/pdo-mysql/PDO.MySql.php");
	require_once("../libraries/security/Cryptography.Hashing.php");
 
	class API_Key{
		 
		static function UpdateRecord($Record)
		  {  $MyUserID = $Record->RecordID;
		     $ApiKey_Code = Cryptography::SHA256_Hashing(Configuration::$Cipher["ApiKey_HashDifficulty"], $Record->Identity, Configuration::$Cipher["Key"]);
			  
		     unset($Record->RecordID);
			 
		     date_default_timezone_set(Configuration::$Server["TimeZone"]);
             $Time_Stamp = date("Y-m-d H:i:s",time());
		     $Result="";
		     
			 $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call ApiKey_Search(?)", array($Record->Identity));
			 
			  if ($Result!="[]"){
				     $Obj_Result = json_decode($Result);
				     $MyUserID = $Obj_Result[0]->Record_ID;
				  }
		      
		    $MyRecord = Array($MyUserID, json_encode($Record), $ApiKey_Code, $Time_Stamp);
		    $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call ApiKey_Update(?,?,?,?)", $MyRecord);
	          
			 echo $Result;
			  
		  }
			  
     //----------------------------------------------------------------------------------------------------------------------------------------------------------------------		  
		static function CheckRecordStatus($Record)
		  {      
			  	 $Search_Key=  Array($Record->Identity, $Record->ApiKey);
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call ApiKey_CheckStatus(?,?)", $Search_Key);
		 
		     if ($Result=="[]"){
			   echo json_encode(Array("Status"=> "Error: The requested record for Account Identity $Record->Identity could not be found."));
	          }
		     else{      
				     $Obj_Result = json_decode($Result);
				     $Obj_Result[0]->API_Key_Info->Record_ID = $Obj_Result[0]->Record_ID;
				     echo  json_encode($Obj_Result[0]->API_Key_Info);
				 }
		  }
	  
	 //------------------------------------------------------------------------------------------------------------------------------		  
 
       static function SearchRecord($Record)
		  {      
			  	 $Search_Key=  Array($Record->Identity);
		 
		         $Result = PDO_MySQL::ExecuteQuery(Configuration::$DBase, "Call ApiKey_Search(?)", $Search_Key);
		 
		     if ($Result=="[]"){
			   echo json_encode(Array("Status"=> "Error: The requested record for Account Identity $Record->Identity could not be found."));
	          }
		     else{     
				     $Obj_Result = json_decode($Result);
				     $Obj_Result[0]->API_Key_Info->Record_ID = $Obj_Result[0]->Record_ID;
					 $Obj_Result[0]->API_Key_Info->API_Key_Code=$Obj_Result[0]->API_Key_Code;
					 
				     echo  json_encode($Obj_Result[0]->API_Key_Info);
				 }
		  }
	  
	 //------------------------------------------------------------------------------------------------------------------------------		  

	}
	
	?>