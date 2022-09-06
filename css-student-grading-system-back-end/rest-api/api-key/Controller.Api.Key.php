<?php
	
	 include_once("Model.Api.Key.php");
	 $Method = strtoupper($_SERVER['REQUEST_METHOD']);
	 
	 $Data = file_get_contents('php://input');
	 $ObjData=json_decode($Data);
     
	 
	if(strtoupper($Method)=="POST")
	   {if (strtoupper($ObjData->Request)=="UPDATE")            { API_Key::UpdateRecord($ObjData->Record);}
	    else if(strtoupper($ObjData->Request)=="CHECK-STATUS")  { API_Key::CheckRecordStatus($ObjData->Record);}
	    else if(strtoupper($ObjData->Request)=="SEARCH")        { API_Key::SearchRecord($ObjData->Record);}
	    else{echo "Error:Unknown Request<BR/>";}
	   }
   else
       { echo "Error: This request is required to use a POST Method<BR/>";}
	  
?>