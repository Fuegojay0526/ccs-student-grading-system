<?php
     
	 require_once("rest-api/libraries/security/Cryptography.Hashing.php");
	 require_once("rest-api/libraries/security/JavaScript.Web.Token.php");
	 require_once("rest-api/api-key/Validate.Api.Key.php");
	 require_once("rest-api/configuration/Configuration.php");
	 
	 $Requested_Module = "NONE";
     $Requested_Process = "NONE";
	 $Request_Accepted = false;
	//  $JWToken="Error";
	 $JWT_Validate=Array("Status" => "\n", "RECORD" => "");
	 $UserAccount="";
	 $Response= json_encode(Array("Status"=> "Error: The requested Process is not Valid."));
	
			    
	 $Data = file_get_contents('php://input');
	 $Method = strtoupper($_SERVER['REQUEST_METHOD']);
	     
	 $Host = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 
	                        "https" : "http") . "://$_SERVER[HTTP_HOST]";
	 $URL=   $Host . dirname($_SERVER['PHP_SELF']);
	 
	//  $API_Key="000-000-000-000";
	  
	         $CurrentDIR = explode("/", dirname($_SERVER['PHP_SELF']));
			 $CurrentDIR = $CurrentDIR[count($CurrentDIR)-1];
			 $Parameter = explode($CurrentDIR ."/", $_SERVER['REQUEST_URI']);
			 $Parameter = strtolower($Parameter[count($Parameter)-1]);		
	           
	 
			  //Get Requested Process/Service
			   if(trim($Parameter)!="")
			   {$Requested_Module = explode("/",$Parameter)[0];                                   
			            if(count(explode("/",$Parameter))>=2)
					       {$Requested_Process = explode("/",$Parameter)[1];}                               
			             else{$Requested_Process = "NONE";}
			   }
			   
			     //Retrieve Page Header
				 $MyHeader = apache_request_headers();
			    
				 //Check Client's API-Key and JWToken
				     if(isset($MyHeader["API-Key"]) AND isset($MyHeader["Identity"]))
						 { $API_Key = Trim($MyHeader["API-Key"]);                                    
							 // Get API-Key from Page Header
					       $ApiKey_Status = Validate::ApiKey($MyHeader["Identity"], $API_Key);      
						    //Check API Key Code Status
						     
							 if ($ApiKey_Status=="ACTIVE")                               
						        {     //If Requested Process is not LOGIN, check the Client's JWToken.
			                         if(strtoupper($Requested_Process)=="LOGIN"){$Request_Accepted = true;}
				                      else{  
									         if(isset($MyHeader["Authorization"]))
						                        {  $JWToken = explode("Bearer ", $MyHeader["Authorization"])[1];                      
													//Get Authorization Bearer from Page Header
											       $JWT_Validate = JS_WebToken::Validate(Configuration::$Cipher["Key"], $JWToken ); 
												   $JWToken= $JWT_Validate["RECORD"];
												     
													 if(str_contains(StrtoUpper($JWT_Validate["Status"]), 'ERROR')==false)
													   {$Request_Accepted = true;}                                                                                   
													    //JWToken Validated and Accepted
												     else{ 
													        echo  json_encode(Array("Status"=> $JWT_Validate["Status"]));            
															  //JWToken Not Accepted
													        return;
														 }
												 }
											   else{
					                                  echo  json_encode(Array("Status"=> "Error: The JWToken is either invalid or not found."));
											          return;
												    }	  
					                       } 
							    }
						     else{echo json_encode(Array("Status"=> "Error: Client's API-Key Status was '$ApiKey_Status'."));
							         return;}
						 }
					 else{ 
						echo json_encode(Array("Status"=> "Error: The Authentication of the Client was not recognized."));
							return;
						}
				  
				     
			 
 
					 
			  //Start//- Assign for page Controller 
			  if(strtoupper($Requested_Module) == "USERS-ACCOUNT")
			    { $URL.= "/rest-api/users-account/Controller.Users.Account.php";}
			  else if(strtoupper($Requested_Module) == "API-KEY")
			    { $URL.= "/rest-api/api-key/Controller.Api.Key.php";}
			 else{$Requested_Module ="NONE"; }
			
			//End//- Assign for page Controller 
			 
			  
			   //Create Array for Header
			   $ArrayData=  json_decode(json_encode(json_decode(trim($Data))), true);
			   $MyData= json_encode(Array("Request" => $Requested_Process, "Record" => $ArrayData));
			   
			   
			   if(($Requested_Process!="NONE") && ($Requested_Module!="NONE") && ($Request_Accepted == true))
		         { //Create a page header to send to the server. 
			       $Options = Array( "http" => Array("header"  => "Content-type: application/x-www-form-urlencoded\r\n",
                            	             "method" => $Method, "content" => $MyData )              
                                   ); 
		           $Context  = stream_context_create($Options);
			     
				                                                           //Verified or Accepted Request.
				          do {$Response = trim(file_get_contents($URL, false, $Context));                    
							//Request URL Page to open.
			                 } while ($Response=="");
							  
							  if(strtoupper($Requested_Process)=="LOGIN")
								   {  
									if(str_contains(StrtoUpper($Response), 'ERROR')==false)
									      {
									       $UserAccount = Cryptography::Encode_Base64url($Response); 
										   $Response = json_encode(Array("Status"=> "Login was successful.")); 
										  }
							       }
				                      
									  $JWToken = JS_WebToken::Create($UserAccount,
										                             Configuration::$Cipher["Key"], 
																     Configuration::$Cipher["JwtExpiration"], 
																	 Configuration::$Server["TimeZone"]
																	  );
																		  
		                              header("Expires: Sat, 13 Jan 1979 05:00:00 GMT");
                                      header("Cache-Control: no-cache");
                                      header("Pragma: no-cache");
									  header("Developer: Jay Fuego");
                                      header("Provider: " . Configuration::$Application["Issuer"]);
									  header("Web-Application: CCS Student Grading System");
				                      header("Authorization: Bearer $JWToken");
					     
				 }  
			
		           echo $Response;
			  
				 
				
				
?>