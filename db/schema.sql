-- CREATE TABLE `Users` (
--     `id` INT AUTO_INCREMENT,
--     `post_count` INT NOT NULL,
--     PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `Posts` (
--     `id` INT AUTO_INCREMENT,
--     `post_id` INT NOT NULL,
--     `user_id` INT NOT NULL,
--     `body` VARCHAR(255) NOT NULL,
--     `type` VARCHAR(255) NOT NULL,
--     PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `User_Posts` (
--     `id` INT AUTO_INCREMENT,
--     `user_id` INT NOT NULL,
--     `post_id` INT NOT NULL,
--     PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `Tags` (
--     `id` INT AUTO_INCREMENT,
--     `name` VARCHAR(255) NOT NULL,
--     `parent` INT NOT NULL,
--     PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `Tags_Join` (
--     `tag_id` INT AUTO_INCREMENT,
--     `post_id` INT NOT NULL,
--     `clothing_id` INT NOT NULL
-- );
-- CREATE TABLE `Clothing` (
--     `id` INT AUTO_INCREMENT,
--     `types` VARCHAR(255) NOT NULL,
--     `img` VARCHAR(255) NOT NULL,
--     `tags` INT NOT NULL,
--     PRIMARY KEY (`id`)
-- );
-- ALTER TABLE `Posts` ADD CONSTRAINT `Posts_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
-- ALTER TABLE `User_Posts` ADD CONSTRAINT `User_Posts_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
-- ALTER TABLE `User_Posts` ADD CONSTRAINT `User_Posts_fk1` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`);
-- ALTER TABLE `Tags` ADD CONSTRAINT `Tags_fk0` FOREIGN KEY (`parent`) REFERENCES `Tags`(`id`);
-- ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk0` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`);
-- ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk1` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`);
-- ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk2` FOREIGN KEY (`clothing_id`) REFERENCES `Clothing`(`id`);
-- ALTER TABLE `Clothing` ADD CONSTRAINT `Clothing_fk0` FOREIGN KEY (`tags`) REFERENCES `Tags_Join`(`tag_id`);


DROP DATABASE IF EXISTS `Narnia`;
CREATE DATABASE `Narnia`;
USE `Narnia`;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(30) NULL DEFAULT NULL,
  `password` VARCHAR(40) NULL DEFAULT NULL,
  `createdAt` VARCHAR(60) NULL DEFAULT NULL,
  `updatedAt` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `clothing`;

CREATE TABLE `clothing` (
  `id` INTEGER AUTO_INCREMENT,
  `detailUrl` VARCHAR(500) NULL DEFAULT NULL,
  `smallImg` VARCHAR(500) NULL DEFAULT NULL,
  `mediumImg` VARCHAR(500) NULL DEFAULT NULL,
  `largeImg` VARCHAR(500) NULL DEFAULT NULL,
  `brand` VARCHAR(100) NULL DEFAULT NULL,
  `color` VARCHAR(50) NULL DEFAULT NULL,
  `department` VARCHAR(50) NULL DEFAULT NULL,
  `itemDimension` VARCHAR(255) NULL DEFAULT NULL,
  `listPrice` VARCHAR(30) NULL DEFAULT NULL,
  `manufacturer` VARCHAR(255) NULL DEFAULT NULL,
  `productGroup` VARCHAR(100) NULL DEFAULT NULL,
  `productType` VARCHAR(100) NULL DEFAULT NULL,
  `size`VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` INTEGER AUTO_INCREMENT,
  `postId` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `body` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `userPosts`;

CREATE TABLE `userPosts` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `postId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ALTER TABLE `userPosts` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`);
-- ALTER TABLE `userPosts` ADD FOREIGN KEY (postId) REFERENCES `posts` (`id`);
-- ALTER TABLE `posts` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`);

