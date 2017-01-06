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
  `thumbnail` VARCHAR(255) NULL DEFAULT NULL,
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
  `postId` INTEGER NULL DEFAULT NULL,
  `userId` INTEGER NOT NULL,
  `likesCount` INTEGER NULL DEFAULT NULL,
  `body` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NOT NULL,
  `createdAt` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `userPosts`;

CREATE TABLE `userPosts` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `postId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Jonathan", "MrJonWu@gmail.com", "12345678910", "MrJonWu", "password", "https://avatars1.githubusercontent.com/u/21250622?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Haris", "haris@haris.com", "12345678910", "Haris", "password", "https://avatars2.githubusercontent.com/u/19330576?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Rick", "Rick@rick.com", "12345678910", "Rick", "password", "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Zach", "Zach@zach.com", "12345678910", "Zach", "password", "https://avatars3.githubusercontent.com/u/14946412?v=3&s=460");

INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (3, 5, "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg", "this should be a new post from Rick.", "image", "3456871348");
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (1, 8, "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-pictures-kitties.jpg", "this should be a new post from MrJonWu.", "image", "3456871349");
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (2, 3, "http://www.londoubros.com/assets/mainmenu/1142/editor/cat-fashion-septem_1773575i.jpg?0.24798612928882752", "this should be a new post from Haris.", "image", "3456871350");
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (4, 9, "http://i.telegraph.co.uk/multimedia/archive/01773/cat-fashion-may_1773579i.jpg", "this should be a new post from Zach.", "image", "3456871351");

INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (1, 1, "this is a comment on Rick's post by Jon", "comment", "3456871348");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (1, 2, "this is a comment on Rick's post by Haris", "comment", "3456871349");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (1, 4, "this is a comment on Rick's post by Zach", "comment", "3456871350");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (2, 2, "this is a comment on Rick's post by Haris", "comment", "3456871348");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (2, 3, "this is a comment on Rick's post by Rick", "comment", "3456871349");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (2, 4, "this is a comment on Rick's post by Zach", "comment", "3456871350");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (3, 1, "this is a comment on Rick's post by Jon", "comment", "3456871348");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (3, 3, "this is a comment on Rick's post by Rick", "comment", "3456871349");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (3, 4, "this is a comment on Rick's post by Zach", "comment", "3456871350");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (4, 1, "this is a comment on Rick's post by Jon", "comment", "3456871348");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (4, 2, "this is a comment on Rick's post by Haris", "comment", "3456871349");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (4, 3, "this is a comment on Rick's post by Rick", "comment", "3456871350");
-- ALTER TABLE `userPosts` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`);
-- ALTER TABLE `userPosts` ADD FOREIGN KEY (postId) REFERENCES `posts` (`id`);
-- ALTER TABLE `posts` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`);

