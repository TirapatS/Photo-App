-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table photos.albums
DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table photos.albums: ~1 rows (approximately)
DELETE FROM `albums`;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
	(1, 'Confetti\'R\'Us lol', 2),
	(2, 'Confetti Album', 1);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

-- Dumping structure for table photos.photos
DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `photos_ibfk_1` (`user_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table photos.photos: ~9 rows (approximately)
DELETE FROM `photos`;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `album_id`, `user_id`) VALUES
	(2, 'kladdkaka', 'kladdkakaurl', 'mums', NULL, 1),
	(3, 'bananpaj', 'bananpajurl', 'banan', NULL, 1),
	(4, 'When life gives you confetti, celebrate', 'bananpajurl', 'Yolo', 1, 2),
	(6, 'Confetti Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(7, 'Confetti Photo #2', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(8, 'Confetti Photo #3', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(9, 'Confetti Photo #4', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(10, 'Confetti Photo #5', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(11, 'Confetti Photo #5', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1),
	(12, 'Confetti Photo #5', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', NULL, 1);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;

-- Dumping structure for table photos.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table photos.users: ~2 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
	(1, 'talking@tom.fish', '$2b$10$.DW1me2Xr55msL/SeFf2b.usuWjoyvNhBaeT6ijijlbwEXQ9dNHv2', 'Talking', 'Tom'),
	(2, 'jn@badcameraphotography.com', '$2b$10$yu90VIF/0p2r5SjMb84wveTnYyPKqLTbp7VuVROLLju5dauoYmn6e', 'Johan', 'Nordström'),
	(3, 'casual@gamer.com', '$2b$10$8x6hfgpurk.APWyLeKdXFOpLHxnIhc4g4cOzecvGjdckc.4nqlU4q', 'gamer', 'god'),
	(4, 'casual@123gamer.com', '$2b$10$BVx.WDT2ve99A8sJCw.1hOTOs36VpqJb66S6rKtzBSqVmRRemScbu', 'casual', 'gamer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
