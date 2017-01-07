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
  `detailPageUrl` VARCHAR(500) NULL DEFAULT NULL,
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
  `productTypeName` VARCHAR(100) NULL DEFAULT NULL,
  `size` VARCHAR(30) NULL DEFAULT NULL,
  `upc` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `asin` VARCHAR(255) NULL DEFAULT NULL,
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

CREATE TABLE `likesPosts` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `postId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Hanes-Mens-X-Temp-Performance-X-Large/dp/B0132MGK5Q%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0132MGK5Q", "https://images-na.ssl-images-amazon.com/images/I/41-qNmknnEL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41-qNmknnEL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41-qNmknnEL.jpg", "Hanes", "Deep Red", "mens", "$10.00", "Apparel", "SHIRT", "Hanes Men's X-Temp Performance Polo, Deep Red, X-Large", "078715978150", "B0132MGK5Q");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Hanes-X-Temp-Performance-Royal-Large/dp/B0132MGJGQ%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0132MGJGQ", "https://images-na.ssl-images-amazon.com/images/I/41dr%2BUP1D8L._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dr%2BUP1D8L._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dr%2BUP1D8L.jpg", "Hanes", "Deep Royal", "mens", "$10.00", "Apparel", "SHIRT", "Hanes Men's X-Temp Performance Polo, Deep Royal, Large", "078715978204", "B0132MGJGQ");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Hanes-STEDMAN-Blended-Jersey-XL-Deep/dp/B0009GHM0G%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0009GHM0G", "https://images-na.ssl-images-amazon.com/images/I/31nIeEVIJLL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/31nIeEVIJLL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/31nIeEVIJLL.jpg", "Hanes", "Deep Forest", "mens", "$7.69", "Apparel", "SHIRT", "Hanes Men's 5.2 oz Hanes STEDMAN Blended Jersey Polo, XL-Deep Forest", "766369121700", "B0009GHM0G");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Dickies-Mens-Original-White-36x32/dp/B0001YRCVU%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0001YRCVU", "https://images-na.ssl-images-amazon.com/images/I/31Q9W1KC5aL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/31Q9W1KC5aL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/31Q9W1KC5aL.jpg", "Dickies", "White", "mens", "$42.00", "Apparel", "PANTS", "Dickies Men's Original 874 Work Pant, White, 36x32", "029311070182", "B0001YRCVU");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Southpole-Active-Basic-Jogger-Fleece/dp/B00M5963BE%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00M5963BE", "https://images-na.ssl-images-amazon.com/images/I/41dwkR6W%2BHL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dwkR6W%2BHL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dwkR6W%2BHL.jpg", "Southpole", "Brown", "mens", "$12.99", "Apparel", "PANTS", "Southpole Men's Active Basic Jogger Fleece Pants,Brown,Large", "882272786918", "B00M5963BE");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/Haggar-Hidden-Expandable-Waist-Plain/dp/B000MXKMG2%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB000MXKMG2", "https://images-na.ssl-images-amazon.com/images/I/3173PKODPCL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/3173PKODPCL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/3173PKODPCL.jpg", "Haggar", "Black", "mens", "$34.99", "Apparel", "PANTS", "Haggar Men's Cool 18 Hidden Expandable Waist Plain Front Pant,Black,36x32", "017457641823", "B000MXKMG2");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/adidas-Originals-Superstar-Adicolor-Fashion/dp/B01CDOTBE6%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01CDOTBE6", "https://images-na.ssl-images-amazon.com/images/I/41E02Hc%2Bj-L._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41E02Hc%2Bj-L._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41E02Hc%2Bj-L.jpg", "adidas", "Scarlet/Scarlet/Scarlet", "mens", "$90.00", "Shoes", "SHOES", "adidas Originals Men's Superstar Adicolor Fashion Sneaker, Scarlet/Scarlet/Scarlet, 10.5 M US", "889138613326", "B01CDOTBE6");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/adidas-Originals-Gazelle-Fashion-Sneaker/dp/B01HLJWS5W%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01HLJWS5W", "https://images-na.ssl-images-amazon.com/images/I/414ggcdSoJL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/414ggcdSoJL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/414ggcdSoJL.jpg", "adidas", "Green/White/Gold Met.", "mens", "$80.00", "Shoes", "SHOES", "adidas Originals Men's Gazelle Fashion Sneaker, Green/White/Gold Met, 10.5 M US", "889768181806", "B01HLJWS5W");
INSERT INTO `clothing` (detailPageUrl, smallImg, mediumImg, largeImg, brand, color, department, listPrice, productGroup, productTypeName, title, upc, asin) VALUES ("https://www.amazon.com/adidas-NEO-Baseline-Fashion-Collegiate/dp/B01A1ELRXS%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01A1ELRXS", "https://images-na.ssl-images-amazon.com/images/I/41dLJg12AhL._SL75_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dLJg12AhL._SL160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/41dLJg12AhL.jpg", "adidas NEO", "Collegiate Navy/Tech Grey/White", "mens", "$59.95", "Shoes", "SHOES", "adidas NEO Men's Baseline Fashion Sneaker, Collegiate Navy/Tech Grey/White, 10.5 M US", "889138786556", "B01A1ELRXS");

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

