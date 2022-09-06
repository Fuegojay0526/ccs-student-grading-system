/*
 Navicat Premium Data Transfer

 Source Server         : MySQL80
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3366
 Source Schema         : mvc_framework

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 17/08/2022 13:01:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for api_key
-- ----------------------------
DROP TABLE IF EXISTS `api_key`;
CREATE TABLE `api_key`  (
  `Record_ID` bigint(0) NOT NULL AUTO_INCREMENT,
  `API_Key_Info` json NULL,
  `API_Key_Code` text CHARACTER SET utf16 COLLATE utf16_bin NULL,
  `Time_Stamp` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`Record_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1003 CHARACTER SET = utf16 COLLATE = utf16_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_key
-- ----------------------------
INSERT INTO `api_key` VALUES (1000, '{\"Status\": \"Active\", \"Identity\": \"C3xF8A7110BA6CC087857AD7E04CD5A999FD5945360F6478300DDA135065EFC5\"}', 'B2xA26DFA35A15607AFC0C2D9984D58FDE21B1A2655B03A91F0354F4B5C1D06C0', '2022-08-17 12:57:29');
INSERT INTO `api_key` VALUES (1001, '{\"Status\": \"Active\", \"Identity\": \"C3x7594BBC61ACEF3A64EEE3AD25F0C5521189BADB60F1AF893711BB669AA344\"}', 'B2x7A8D142905A1469CC7F0E408FA96AC2418FFA34C95F3FA6D42E765FB968757', '2022-08-17 12:58:02');

-- ----------------------------
-- Table structure for users_account
-- ----------------------------
DROP TABLE IF EXISTS `users_account`;
CREATE TABLE `users_account`  (
  `Record_ID` bigint(0) NOT NULL AUTO_INCREMENT,
  `Users_Info` json NULL,
  `Identity` varchar(255) CHARACTER SET utf16 COLLATE utf16_bin NULL DEFAULT '',
  `Time_Stamp` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`Record_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1005 CHARACTER SET = utf16 COLLATE = utf16_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_account
-- ----------------------------
INSERT INTO `users_account` VALUES (1000, '{\"Name\": \"Jose Rizal\", \"Status\": \"Active\", \"Password\": \"8OHwWPjLHL6J5s-o9fhoVw\", \"Username\": \"Jose\", \"UserLevel\": \"Administrator\", \"EmailAddress\": \"rizal@gmail.com\"}', 'C3xF8A7110BA6CC087857AD7E04CD5A999FD5945360F6478300DDA135065EFC5', '2022-08-16 22:24:45');
INSERT INTO `users_account` VALUES (1001, '{\"Name\": \"Mike Genesis\", \"Status\": \"Active\", \"Password\": \"8OHwWPjLHL6J5s-o9fhoVw\", \"Username\": \"Mike\", \"UserLevel\": \"Developer\", \"EmailAddress\": \"mike@gmail.com\"}', 'C3x7594BBC61ACEF3A64EEE3AD25F0C5521189BADB60F1AF893711BB669AA344', '2022-08-17 12:59:03');
INSERT INTO `users_account` VALUES (1002, '{\"Name\": \"Mark Bonifacio\", \"Status\": \"Inactive\", \"Password\": \"8OHwWPjLHL6J5s-o9fhoVw\", \"Username\": \"Mark\", \"UserLevel\": \"Administrator\", \"EmailAddress\": \"Mark@gmail.com\"}', 'C3x3B7AA32A1A3C784599D2566F274F61F980ED365CC27C6CE62292FE65', '2022-08-17 12:58:54');

-- ----------------------------
-- Procedure structure for ApiKey_CheckStatus
-- ----------------------------
DROP PROCEDURE IF EXISTS `ApiKey_CheckStatus`;
delimiter ;;
CREATE PROCEDURE `ApiKey_CheckStatus`(IN _Identity LONGTEXT, IN _ApiKeyCode LONGTEXT)
BEGIN
   Select Record_ID, API_Key_Info, API_Key_Code, Time_Stamp FROM Api_Key
	  Where API_Key_Info->>'$.Identity'  = _Identity and  API_Key_Code  =  _ApiKeyCode;
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ApiKey_Search
-- ----------------------------
DROP PROCEDURE IF EXISTS `ApiKey_Search`;
delimiter ;;
CREATE PROCEDURE `ApiKey_Search`(IN _Identity LONGTEXT)
BEGIN
   Select Record_ID, API_Key_Info, API_Key_Code, Time_Stamp FROM Api_Key
	  Where API_Key_Info->>'$.Identity'  = _Identity;
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ApiKey_Update
-- ----------------------------
DROP PROCEDURE IF EXISTS `ApiKey_Update`;
delimiter ;;
CREATE PROCEDURE `ApiKey_Update`(IN _Record_ID BIGINT,  IN _ApiKeyInfo LONGTEXT, IN _ApiKeyCode LONGTEXT, IN _Timestamp TIMESTAMP)
BEGIN
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
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ApiKey_Validate
-- ----------------------------
DROP PROCEDURE IF EXISTS `ApiKey_Validate`;
delimiter ;;
CREATE PROCEDURE `ApiKey_Validate`(IN _ApiKeyCode LONGTEXT, IN _Identity LONGTEXT)
BEGIN
   SELECT API_Key_Info->>'$.Status' As Status FROM  API_Key where API_Key_Code  =  _ApiKeyCode and API_Key_Info->>'$.Identity' = _Identity;
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_List
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_List`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_List`()
BEGIN
   Select * FROM Users_account order by Record_ID ASC;
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_Login
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_Login`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_Login`(_Username VARCHAR(100), _Password VARCHAR(100))
BEGIN
   Select   Record_ID, Users_Info, Identity, Time_Stamp FROM (SELECT Record_ID, Users_Info, Identity, Time_Stamp, UPPER(Users_Info) AS CapUserInfo FROM Users_account) AS MyTable  
     Where (CapUserInfo->>'$.USERNAME'  = UPPER(_Username) and Users_Info->>'$.Password' = _Password and Users_Info->>'$.Status'='Active');
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_Search
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_Search`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_Search`(_UserID INT, _Username VARCHAR(100), _Email VARCHAR(100))
BEGIN
   Select   Record_ID, Users_Info, Time_Stamp FROM (SELECT Record_ID, Users_Info, Time_Stamp, UPPER(Users_Info) AS CapUserInfo FROM Users_account) AS MyTable  
     Where CapUserInfo->>'$.USERNAME'  = UPPER(_Username) OR  Record_ID  =  _UserID OR CapUserInfo->>'$.EMAILADDRESS' = UPPER(_Email);
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_Update
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_Update`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_Update`(IN _UserId BIGINT,  IN _UserInfo LONGTEXT, IN _Timestamp TIMESTAMP)
BEGIN
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
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_UpdateIdentity
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_UpdateIdentity`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_UpdateIdentity`(IN _Record_ID BIGINT, IN _Identity LONGTEXT)
BEGIN
    UPDATE Users_Account SET Identity =  _Identity WHERE  Record_ID =_Record_ID ;
  END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for UsersAccount_UpdatePassword
-- ----------------------------
DROP PROCEDURE IF EXISTS `UsersAccount_UpdatePassword`;
delimiter ;;
CREATE PROCEDURE `UsersAccount_UpdatePassword`(IN _Record_ID BIGINT, IN _Password VARCHAR(100))
BEGIN
    UPDATE users_account SET Users_Info = JSON_SET(Users_Info, '$.Password', CAST(_Password AS CHAR))
     WHERE  Record_ID= _Record_ID;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
