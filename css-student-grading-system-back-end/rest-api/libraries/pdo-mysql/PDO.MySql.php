
<?php
	
 
	class PDO_MySQL
	 {	 
	  
//Open database	
    public static function OpenDatabase($DBase)
        {  $Options = [ PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
						PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
						PDO::ATTR_EMULATE_PREPARES   => false];
		   $Connection = new PDO("mysql:host=".  $DBase["Host"] . ";port=" .  $DBase["Port"] . ";dbname=" .  $DBase["DBName"] . ";charset=utf8mb4;",  $DBase["Username"], $DBase["Password"], $Options);
		   return $Connection;
		}
//executenonquery	
    public static function ExecuteNonQuery($DBase, $Query, $Parameter=null)
        {  $RowCount=0;
		    try { 
			     $Connection= Self::OpenDatabase($DBase);
			     $Statement=$Connection->prepare($Query);
                 
 				  if($Parameter==null){$Statement->execute();}
				   else{$Statement->execute($Parameter);}
				   
			     $RowCount= $Statement->rowCount();
				 
		       } catch (PDOException $e) {return "Database Error: ". $e->getMessage();}
			    
			return $RowCount;
		}

  public static function ExecuteQuery($DBase, $Query, $Parameter=null)
        {    $Result="";
	         try {   
			       $Connection= Self::OpenDatabase($DBase);
			       $Statement=$Connection->prepare($Query);
				   
				   if($Parameter==null){$Statement->execute();}
				   else{$Statement->execute($Parameter);}
				   
			       $Result= json_encode($Statement->fetchall(PDO::FETCH_ASSOC));                       
				 } catch (PDOException $e) { return "Database Error: ". $e->getMessage();}
			  
			  $Result= str_replace("\\", "", $Result);
			  $Result= str_replace("\"{", "{", $Result);
			  $Result= str_replace("}\"", "}", $Result);
			  
			 return $Result;
		 }

   							 
	    
	  }
	
	?>