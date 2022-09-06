<?php
   include_once("Model.Users.Account.php");
   
   $Method = strtoupper($_SERVER['REQUEST_METHOD']);
   
     $Data = file_get_contents('php://input');
     $ObjData=json_decode($Data);
	
      
	if(strtoupper($Method)=="POST")
	   {if (strtoupper($ObjData->Request)=="UPDATE")      			{ Users_Account::UpdateRecord($ObjData->Record);}
	    else if(strtoupper($ObjData->Request)=="SEARCH")  			{ Users_Account::SearchRecord($ObjData->Record); }
	    else if(strtoupper($ObjData->Request)=="LOGIN")        	    { Users_Account::LoginUser($ObjData->Record); }
	    else if(strtoupper($ObjData->Request)=="CHANGE-PASSWORD")	{ Users_Account::ChangePassword($ObjData->Record); }
	    else if(strtoupper($ObjData->Request)=="USERS-LIST")		{ Users_Account::UsersList();}
	    else{echo "Error:Unknown Request<BR/>";}
	   }
   else
       { echo "Error: This request is required to use a POST Method<BR/>";}
?>