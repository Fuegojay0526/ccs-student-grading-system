<?php


class Cryptography{
  

 static function EncryptData($PlainText, $CipherKey) {
	    
	   $CipherKey = substr(hash('sha256', $CipherKey, true), 0, 32);
       $Method = 'aes-256-cbc';
	   
     // IV must be exact 16 chars (128 bit)
       $InitVector = chr(0x0) . chr(0x1) . chr(0x1) . chr(0x3) . chr(0x1) . chr(0x9) . chr(0x7) . chr(0x9) . chr(0x0) . chr(0x4) . chr(0x2) . chr(0x7) . chr(0x1) . chr(0x9) . chr(0x8) . chr(0x4);
      
       $Encrypted = Self::Encode_Base64url(openssl_encrypt($PlainText, $Method, $CipherKey, OPENSSL_RAW_DATA, $InitVector));
        
   return $Encrypted;
}



 static function DecryptData($CipherText, $CipherKey) {
        
      $CipherKey = substr(hash('sha256', $CipherKey, true), 0, 32);
	  $Method = 'aes-256-cbc';
	   
   // IV must be exact 16 chars (128 bit)
       $InitVector = chr(0x0) . chr(0x1) . chr(0x1) . chr(0x3) . chr(0x1) . chr(0x9) . chr(0x7) . chr(0x9) . chr(0x0) . chr(0x4) . chr(0x2) . chr(0x7) . chr(0x1) . chr(0x9) . chr(0x8) . chr(0x4);
       
       $Decrypted = openssl_decrypt(Self::Decode_Base64url($CipherText), $Method, $CipherKey, OPENSSL_RAW_DATA, $InitVector);
	     
    return $Decrypted;
}

static function salthash($rawData, $SecretKey=null){
  $SecretKey = hash('sha256', $rawData . Configuration::$Cipher["Key"]);
  return $SecretKey;
}

 static function SHA256_Hashing($Difficulty, $rawData,  $SecretKey=null) {
      $Nonce=0;
	  $SecretKey = hash("sha256",$SecretKey); 
	    if ($Difficulty >= 7) { $Difficulty = 6; }
        else if ($Difficulty <= 0) { $Difficulty = 1; }
	  
	        $ExtraChar = "A-B-C-D-E-F";
            $TempHashResult = hash("sha256", $rawData . $SecretKey);
            $Zero_string = "";
			
			$PadStr = str_pad("", $Difficulty, "0", STR_PAD_BOTH);
			 
   for($Cnt=0; $Cnt<10000000000000000; $Cnt++){
	  if(substr($TempHashResult ,0, $Difficulty)===$PadStr){
		 $TempHashResult = explode("-", $ExtraChar)[$Difficulty-1] . $Difficulty . "x" .  explode( $PadStr, strtoupper($TempHashResult))[1] ;
         $Nonce=$Cnt; 
         break;		
	   }
	  $TempHashResult = hash("sha256", $TempHashResult . $Cnt);
     } 
      
	  return  $TempHashResult;
	  
     }


 
public static function Encode_Base64url($data)
{ 
  $b64 = base64_encode($data);
 
  if ($b64 === false) {
    return false;
  }
 
  $url = strtr($b64, '+/', '-_');
 
  return rtrim($url, '=');
}


 
public static function Decode_Base64url($data, $strict = false)
{ 
  $b64 = strtr($data, '-_', '+/');
  return base64_decode($b64, $strict);
}

 
 


}
 
?>