# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.9)
# Database: creditcard
# Generation Time: 2017-09-04 15:27:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(50) DEFAULT NULL COMMENT '用户登录名，手机号',
  `pwd` varchar(128) DEFAULT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `contact` varchar(50) DEFAULT NULL COMMENT '默认联系方式，手机号码，作为登陆名',
  `address` varchar(255) DEFAULT NULL COMMENT '默认送货地址',
  `name` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `identificationNo` varchar(18) DEFAULT NULL COMMENT '身份证号码',
  `time` timestamp NULL DEFAULT NULL COMMENT '加入时间',
  `wechatId` varchar(255) DEFAULT NULL COMMENT '微信id（加密后的)',
  `alipayAcount` varchar(50) DEFAULT NULL COMMENT '支付宝帐号',
  `alipayName` varchar(50) DEFAULT NULL COMMENT '支付宝绑定的姓名',
  `disable` binary(1) DEFAULT '1' COMMENT '是否禁止，1禁止，0没有禁止',
  `cartId` int(11) DEFAULT NULL COMMENT '购物车id,每人只有一个',
  `point` double(8,2) DEFAULT NULL COMMENT '积分余额',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cartId` (`cartId`),
  UNIQUE KEY `wechatId` (`wechatId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `pwd`, `email`, `contact`, `address`, `name`, `identificationNo`, `time`, `wechatId`, `alipayAcount`, `alipayName`, `disable`, `cartId`, `point`)
VALUES
	(1,'ivan','123456','homeemail@qq.com','15622317639','荷光路','刘传宝','44022219900815033X',NULL,NULL,NULL,NULL,X'30',1,1000.00),
	(2,'user1',NULL,'xxoo@xx.com',NULL,NULL,'小星星',NULL,NULL,NULL,NULL,NULL,X'31',NULL,NULL),
	(7,'user2',NULL,'email@email.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,X'31',NULL,NULL),
	(11,'user3',NULL,'user3@xx.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,X'31',NULL,NULL),
	(12,'user4',NULL,'user4@xx.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,X'31',NULL,NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
