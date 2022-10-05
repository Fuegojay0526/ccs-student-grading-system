<?php   
          
     ob_start();   
  	   include("Modules\Home-Page\Container.html");
           $Html_Content = ob_get_contents();
	 ob_clean();
    
	echo $Html_Content;
	    
?>