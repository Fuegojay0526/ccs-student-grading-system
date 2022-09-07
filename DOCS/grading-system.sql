-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2022 at 03:35 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grading-system`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ApiKey_CheckStatus` (IN `_Identity` LONGTEXT, IN `_ApiKeyCode` LONGTEXT)   BEGIN
   Select Record_ID, API_Key_Info, API_Key_Code, Time_Stamp FROM Api_Key
	  Where API_Key_Info->>'$.Identity'  = _Identity and  API_Key_Code  =  _ApiKeyCode;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ApiKey_Search` (IN `_Identity` LONGTEXT)   BEGIN
   Select Record_ID, API_Key_Info, API_Key_Code, Time_Stamp FROM Api_Key
	  Where API_Key_Info->>'$.Identity'  = _Identity;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ApiKey_Update` (IN `_Record_ID` BIGINT, IN `_ApiKeyInfo` LONGTEXT, IN `_ApiKeyCode` LONGTEXT, IN `_Timestamp` TIMESTAMP)   BEGIN
   ALTER TABLE Api_Key AUTO_INCREMENT = 0;
	 ALTER TABLE Api_Key AUTO_INCREMENT = 1;
	 
   IF EXISTS(Select * From Api_Key) THEN 
    BEGIN 
	  IF(_Record_ID >=1000) THEN
	       BEGIN
            INSERT INTO Api_Key(Record_ID, API_Key_Info, API_Key_Code, Time_Stamp) 
                     Values(_Record_ID,  _ApiKeyInfo, _ApiKeyCode, _Timestamp) ON DUPLICATE KEY UPDATE  
                           API_Key_Info=VALUES(API_Key_Info),  API_Key_Code=VALUES(API_Key_Code), Time_Stamp=VALUES(Time_Stamp); 
         END;
     ELSE
	       BEGIN 
            INSERT INTO Api_Key(Record_ID, API_Key_Info, API_Key_Code, Time_Stamp)
                              Values(0, _ApiKeyInfo, _ApiKeyCode, _Timestamp);
          END;  
     END IF;		
    END; 
   ELSE
       BEGIN 
        INSERT INTO Api_Key(Record_ID, API_Key_Info, API_Key_Code, Time_Stamp) 
                    Values(1000,  _ApiKeyInfo, _ApiKeyCode, _Timestamp);
       END;  
  END IF;
    SELECT Record_ID, API_Key_Code FROM Api_Key ORDER BY Record_ID DESC LIMIT 1;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ApiKey_Validate` (IN `_ApiKeyCode` LONGTEXT, IN `_Identity` LONGTEXT)   BEGIN
   SELECT API_Key_Info->>'$.Status' As Status FROM  API_Key where API_Key_Code  =  _ApiKeyCode and API_Key_Info->>'$.Identity' = _Identity;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StudentsAccount_Login` (`_Username` VARCHAR(100), `_Password` VARCHAR(100))   BEGIN
   
      Select Record_ID, Students_Info, Identity, Time_Stamp FROM (SELECT Record_ID, Users_Info, Identity, Time_Stamp, UPPER(Students_Info) 
           AS CapUserInfo FROM Students_account) AS MyTable Where (CapUserInfo->>'$.USERNAME'  = UPPER(_Username) 
            and Students_Info->>'$.Password' = _Password and Students_Info->>'$.Status'='Active');
 
   END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StudentsAccount_Update` (IN `_StudentId` BIGINT, IN `_StudentInfo` LONGTEXT, IN `_Timestamp` TIMESTAMP)   BEGIN
   
     IF EXISTS(Select * From Students_Account) THEN 
    
        BEGIN 
	  
         IF(_StudentId>=1000) THEN
	       
           BEGIN
           
            INSERT INTO Students_Account(Record_ID, Students_Info,  Time_Stamp) Values(_StudentId,  _StudentInfo, _Timestamp) 
                   ON DUPLICATE KEY UPDATE Students_Info=VALUES(Students_Info), Time_Stamp=VALUES(Time_Stamp); 
         
            END;
    
          ELSE
	       
            BEGIN 
            
             INSERT INTO Students_Account(Record_ID, Students_Info, Time_Stamp) Values(0, _StudentInfo, _Timestamp);

            END;  
     
          END IF;		
    
       END; 
   
       ELSE
      
         BEGIN 
        
          INSERT INTO Students_Account(Record_ID, Students_Info, Time_Stamp) Values(1000,  _StudentInfo,  _Timestamp);
      
         END;  
  
       END IF;
    
    
     SELECT Record_ID FROM Students_Account ORDER BY Record_ID DESC LIMIT 1;
  
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StudentsAccount_UpdateIdentity` (IN `_Record_ID` BIGINT, IN `_Identity` LONGTEXT)   BEGIN
    UPDATE Students_Account SET Identity =  _Identity WHERE  Record_ID =_Record_ID ;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StudentsAccount_UpdatePassword` (IN `_Record_ID` BIGINT, IN `_Password` VARCHAR(100))   BEGIN
    
    UPDATE students_account SET Students_Info = JSON_SET(Students_Info, '$.Password', CAST(_Password AS CHAR))
     
          WHERE  Record_ID=_Record_ID ;

  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_List` ()   BEGIN
   Select * FROM Users_account order by Record_ID ASC;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_Login` (`_Username` VARCHAR(100), `_Password` VARCHAR(100))   BEGIN
   Select   Record_ID, Users_Info, Identity, Time_Stamp FROM (SELECT Record_ID, Users_Info, Identity, Time_Stamp, UPPER(Users_Info) AS CapUserInfo FROM Users_account) AS MyTable  
     Where (CapUserInfo->>'$.USERNAME'  = UPPER(_Username) and Users_Info->>'$.Password' = _Password and Users_Info->>'$.Status'='Active');
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_Search` (`_UserID` INT, `_Username` VARCHAR(100), `_Email` VARCHAR(100))   BEGIN
   Select   Record_ID, Users_Info, Time_Stamp FROM (SELECT Record_ID, Users_Info, Time_Stamp, UPPER(Users_Info) AS CapUserInfo FROM Users_account) AS MyTable  
     Where CapUserInfo->>'$.USERNAME'  = UPPER(_Username) OR  Record_ID  =  _UserID OR CapUserInfo->>'$.EMAILADDRESS' = UPPER(_Email);
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_Update` (IN `_UserId` BIGINT, IN `_UserInfo` LONGTEXT, IN `_Timestamp` TIMESTAMP)   BEGIN
   ALTER TABLE users_account AUTO_INCREMENT = 0;
	 ALTER TABLE users_account AUTO_INCREMENT = 1;
	 
   IF EXISTS(Select * From Users_Account) THEN 
    BEGIN 
	  IF(_UserId >=1000) THEN
	       BEGIN
            INSERT INTO Users_Account(Record_ID, Users_Info,  Time_Stamp) 
                     Values(_UserId,  _UserInfo, _Timestamp) ON DUPLICATE KEY UPDATE  
                           Users_Info=VALUES(Users_Info),  Time_Stamp=VALUES(Time_Stamp); 
         END;
     ELSE
	       BEGIN 
            INSERT INTO Users_Account(Record_ID, Users_Info, Time_Stamp) 
                              Values(0, _UserInfo, _Timestamp);
          END;  
     END IF;		
    END; 
   ELSE
       BEGIN 
        INSERT INTO Users_Account(Record_ID, Users_Info, Time_Stamp) 
                    Values(1000,  _UserInfo,  _Timestamp);
       END;  
  END IF;
    SELECT Record_ID FROM Users_Account ORDER BY Record_ID DESC LIMIT 1;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_UpdateIdentity` (IN `_Record_ID` BIGINT, IN `_Identity` LONGTEXT)   BEGIN
    UPDATE Users_Account SET Identity =  _Identity WHERE  Record_ID =_Record_ID ;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAccount_UpdatePassword` (IN `_Record_ID` BIGINT, IN `_Password` VARCHAR(100))   BEGIN
    UPDATE users_account SET Users_Info = JSON_SET(Users_Info, '$.Password', CAST(_Password AS CHAR))
     WHERE  Record_ID= _Record_ID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `api_key`
--

CREATE TABLE `api_key` (
  `Record_ID` bigint NOT NULL,
  `API_Key_Info` json DEFAULT NULL,
  `API_Key_Code` text CHARACTER SET utf16 COLLATE utf16_bin,
  `Time_Stamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `api_key`
--

INSERT INTO `api_key` (`Record_ID`, `API_Key_Info`, `API_Key_Code`, `Time_Stamp`) VALUES
(1000, '{\"Status\": \"Active\", \"Identity\": \"C3xF8A7110BA6CC087857AD7E04CD5A999FD5945360F6478300DDA135065EFC5\"}', 'B2xA26DFA35A15607AFC0C2D9984D58FDE21B1A2655B03A91F0354F4B5C1D06C0', '2022-08-17 04:57:29'),
(1001, '{\"Status\": \"Active\", \"Identity\": \"C3x7594BBC61ACEF3A64EEE3AD25F0C5521189BADB60F1AF893711BB669AA344\"}', 'B2x7A8D142905A1469CC7F0E408FA96AC2418FFA34C95F3FA6D42E765FB968757', '2022-08-17 04:58:02'),
(1002, '{\"Status\": \"Active\", \"Identity\": \"C3x8DC64248044FB1B295F4FA6C46449072CF8842EBC124037E3B64F3871680A\"}', 'B2x87150B7555AE9205E210338798CAF7876191BEA7A9C6A0277BB4B5DF908B46', '2022-09-06 03:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `students_account`
--

CREATE TABLE `students_account` (
  `Record_ID` int NOT NULL,
  `Students_Info` json DEFAULT NULL,
  `Courses` json DEFAULT NULL,
  `Identity` varchar(255) CHARACTER SET utf16 COLLATE utf16_bin DEFAULT NULL,
  `Time_Stamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users_account`
--

CREATE TABLE `users_account` (
  `Record_ID` bigint NOT NULL,
  `Users_Info` json DEFAULT NULL,
  `Identity` varchar(255) CHARACTER SET utf16 COLLATE utf16_bin DEFAULT '',
  `Time_Stamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users_account`
--

INSERT INTO `users_account` (`Record_ID`, `Users_Info`, `Identity`, `Time_Stamp`) VALUES
(1004, '{\"Name\": \"Jay Fuego\", \"Status\": \"Active\", \"Password\": \"A1wZFcnH5Es3OxvU-RZWXA\", \"Username\": \"jayfuego0526\", \"UserLevel\": \"Administrator\", \"EmailAddress\": \"jayfuego052620@gmail.com\"}', 'C3xE32A8ED616EFE70816E6A9FD3A926CCF72CDE9292DD6AAF5C6598E8EE703B', '2022-09-06 03:38:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_key`
--
ALTER TABLE `api_key`
  ADD PRIMARY KEY (`Record_ID`) USING BTREE;

--
-- Indexes for table `students_account`
--
ALTER TABLE `students_account`
  ADD PRIMARY KEY (`Record_ID`);

--
-- Indexes for table `users_account`
--
ALTER TABLE `users_account`
  ADD PRIMARY KEY (`Record_ID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_key`
--
ALTER TABLE `api_key`
  MODIFY `Record_ID` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;

--
-- AUTO_INCREMENT for table `students_account`
--
ALTER TABLE `students_account`
  MODIFY `Record_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_account`
--
ALTER TABLE `users_account`
  MODIFY `Record_ID` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
