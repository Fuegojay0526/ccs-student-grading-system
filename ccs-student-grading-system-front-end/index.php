<?php   
          
     ob_start();   
  	   include("Modules\Users-Account\Users-Account-Login-Form.html");
           $Html_Content = ob_get_contents();
	 ob_clean();
    
	echo $Html_Content;
	    
?>