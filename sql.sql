CREATE DATABASE `db_naan` /*!40100 DEFAULT CHARACTER SET utf8 */;



CREATE TABLE `tb_contacts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `MiddleNamw` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Mobile` varchar(45) DEFAULT NULL,
  `jobTitle` varchar(45) DEFAULT NULL,
  `Employer` varchar(45) DEFAULT NULL,
  `Notes` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `ProfilePic` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;




