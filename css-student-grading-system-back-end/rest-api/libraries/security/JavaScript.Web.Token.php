
<?php
 
 ////////////////////////////////////////////////////////////
  //	Coded by	: Armando T. Saguin Jr.					//
  //				  Coderstation Informatics Innovator	//
  //	Email		: saguin.armando.jr@gmail.com			//
  //	Mobile No.	: +639306694943							//
  //	Version		: 1.0.01								//
  ////////////////////////////////////////////////////////////

//################################################################################################################################
//################################################################################################################################


 // "Cryptography.Hashing.php"  must be included in this Class in order to run the function..
 
class JS_WebToken{
 
 public static function Create($UserInfo, $CipherKey, $JWTExpiration, $Timezone)
 {  
    date_default_timezone_set($Timezone);
  
	 $Header = json_encode(["TYP" => "JWT", "ALG" => "HS256"]);
	 $Payload = json_encode([ 
						     "RECORD"  =>  $UserInfo,	 
						     "NBF"  =>	time() + 1,
						     "IAT"  =>	time(),
						     "EXP"  =>  time() + (int)$JWTExpiration 
						   ]);	
						  
    $Encode_Header = Cryptography::Encode_Base64url($Header);
	$Encode_Payload = Cryptography::Encode_Base64url($Payload);
	$Signature = hash_hmac("sha256", $Encode_Header . "." . $Encode_Payload, $CipherKey, true);
	$Encode_Signature = Cryptography::Encode_Base64url($Signature);
	
	 $JWToken = $Encode_Header . "." . $Encode_Payload . "." . $Encode_Signature;
	
	  return $JWToken;
	  }
	
//=========================================================================================================================================
//=========================================================================================================================================

  public static function Validate($CipherKey, $JWT_Code)
   {
	   
    $Token  = explode(".", $JWT_Code);
	$Header = Cryptography::Decode_Base64url($Token[0]);
	$Payload = Cryptography::Decode_Base64url($Token[1]);
	$ProvidedSignature = $Token[2];
	
	
	$Encode_Header = Cryptography::Encode_Base64url($Header);
	$Encode_Payload = Cryptography::Encode_Base64url($Payload);
	$Signature = hash_hmac("sha256", $Encode_Header . "." . $Encode_Payload, $CipherKey, true);
	$Encode_Signature = Cryptography::Encode_Base64url($Signature);
	 
	  $JWT_Code = $Encode_Header . "." . $Encode_Payload . "." . $Encode_Signature;
	
	  $isValidSignature = (($ProvidedSignature === $Encode_Signature)? 1:0);
	  
      $Status="JWT Token is valid and has been validated successfully.";
	   
	  if($isValidSignature==0)
	   {$Status = "Error: Invalid Signature of JWT Token.";}
		
	  if(Self::TimeToSeconds(Self::TimeStampDiff(time(), json_decode($Payload)->EXP))<=0)
	   {$Status  = "Error: JWT Token is already Expired.";}
	 
	   
	  return Array("Status" => $Status .  "\n",
	               "RECORD" => json_decode($Payload)->RECORD);
     }
   
//=========================================================================================================================================
 
 private static function TimeStampDiff($Time1,$Time2)
  {
    $datetime1 = new DateTime("@$Time1");
    $datetime2 = new DateTime("@$Time2");
    $interval = $datetime1->diff($datetime2);
	 
    return $interval;
  }
//=========================================================================================================================================
 
 private static function TimeToSeconds($DateInterval)
  {
    $HSec=  $DateInterval->format('%H') * 3600 ;
    $MSec=  $DateInterval->format('%I') * 60  ;
    $Sec=   $DateInterval->format('%s');
    $Symbol=1;
	
	if($DateInterval->format('%r')=="-")
	{$Symbol=-1;}

    return  ($HSec +  $MSec +  $Sec) * $Symbol;
  }
   
 
//=========================================================================================================================================
//=========================================================================================================================================

}
 
?>