CREATE SCHEMA `cardbank` ;

CREATE TABLE `collections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `email` varchar(55) NOT NULL,
  `cardname` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `cardcondition` varchar(15) NOT NULL,
  `defect` varchar(120) NOT NULL,
  `price` varchar(45) NOT NULL,
  `available` varchar(45) NOT NULL,
  `image` longblob NOT NULL,
  PRIMARY KEY (`id`)
)
