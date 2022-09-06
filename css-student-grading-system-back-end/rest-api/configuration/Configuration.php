 
 <?php
 
    class Configuration{
		 
		public static $DBase = array("Host"		=> "127.0.0.1", 
									 "Port"		=> "3306",
									 "Username"	=> "root", 
									 "Password"	=> "",
									 "DBName"	=> "mvc-framework");
									 
	    public static $Server = array("TimeZone" => "Asia/Manila");
		
		public static $Cipher = array("Key" => "#MyS3CR3T#",
		                              "JwtExpiration" => 300,
									  "ApiKey_HashDifficulty" => 2,
                                      "Identity_HashDifficulty" => 3 									  
									  );
		 
		public static $Application = array("Issuer" => "College of Computer Studies");							  
		 							  
	 
	
	}


	
 ?>
							 