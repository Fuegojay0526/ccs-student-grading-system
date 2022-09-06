<?php
   include_once("Model.Students.Account.php");
   
   $Method = strtoupper($_SERVER['REQUEST_METHOD']);
   
     $Data = file_get_contents('php://input');
     $ObjData=json_decode($Data);
	
      
	if(strtoupper($Method)=="POST")
	   {
	    if(strtoupper($ObjData->Request)=="LOGIN")        	    	{ Students_Account::LoginUser($ObjData->Record); }
	    else if(strtoupper($ObjData->Request)=="CHANGE-PASSWORD")	{ Students_Account::ChangePassword($ObjData->Record); }
	    else{echo "Error:Unknown Request<BR/>";}
	   }
   else
       { echo "Error: This request is required to use a POST Method<BR/>";}
?>