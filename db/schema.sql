DROP DATABASE IF EXISTS `Narnia`;
CREATE DATABASE `Narnia`;
USE `Narnia`;

-- ---
-- Table 'users'
--
-- ---

CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(30) NULL DEFAULT NULL,
  `thumbnail` VARCHAR(255) DEFAULT 'https://www.buira.org/assets/images/shared/default-profile.png',
  `password` VARCHAR(40) NULL DEFAULT NULL,
  `createdAt` VARCHAR(60) NULL DEFAULT NULL,
  `updatedAt` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'clothing'
--
-- ---

CREATE TABLE `clothing` (
  `id` INTEGER AUTO_INCREMENT,
  `detailPageUrl` VARCHAR(500) NULL DEFAULT NULL,
  `smallImg` VARCHAR(500) NULL DEFAULT NULL,
  `mediumImg` VARCHAR(500) NULL DEFAULT NULL,
  `largeImg` VARCHAR(500) NULL DEFAULT NULL,
  `thumbnail` VARCHAR(500) NULL DEFAULT NULL,
  `brand` VARCHAR(100) NULL DEFAULT NULL,
  `color` VARCHAR(50) NULL DEFAULT NULL,
  `department` VARCHAR(50) NULL DEFAULT NULL,
  `listPrice` VARCHAR(30) NULL DEFAULT NULL,
  `productGroup` VARCHAR(100) NULL DEFAULT NULL,
  `productTypeName` VARCHAR(100) NULL DEFAULT NULL,
  `upc` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `asin` VARCHAR(255) NULL DEFAULT NULL,
  `material` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `position` VARCHAR(255) NULL DEFAULT NULL,
  `tagIds` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'posts'
--
-- ---

CREATE TABLE `posts` (
  `id` INTEGER AUTO_INCREMENT,
  `postId` INTEGER NULL DEFAULT NULL,
  `userId` INTEGER NOT NULL,
  `likesCount` INTEGER NULL DEFAULT NULL,
  `body` VARCHAR(255) NOT NULL,
  `shirtId` INTEGER NULL DEFAULT NULL,
  `pantId` INTEGER NULL DEFAULT NULL,
  `shoesId` INTEGER NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NOT NULL,
  `createdAt` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'wardrobe'
--
-- ---

CREATE TABLE `wardrobe` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `clothingId` INTEGER,
  `list` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES users(`id`),
  FOREIGN KEY (`clothingId`) REFERENCES clothing(`id`)
);

-- ---
-- Table 'tags'
--
-- ---

CREATE TABLE `tags` (
  `id` INTEGER AUTO_INCREMENT,
  `tag` VARCHAR(255) NOT NULL,
  `count` INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag` (`tag`)
);

-- ---
-- Join Table 'userPosts'
--
-- ---

CREATE TABLE `userPosts` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `postId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Join Table 'likesPosts'
--
-- ---

CREATE TABLE `likesPosts` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `postId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Join Table 'userFollowers'
--
-- ---

CREATE TABLE `userFollowers` (
  `id` INTEGER AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `followerId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Join Table 'postTags'
--
-- ---

CREATE TABLE `postTags` (
  `id` INTEGER AUTO_INCREMENT,
  `postId` INTEGER NOT NULL,
  `tagId` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`postId`) REFERENCES posts(`id`),
  FOREIGN KEY (`tagId`) REFERENCES tags(`id`)
);

-- ---
-- Seed Data
--
-- ---

-- Users

INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Jon", "Jon@jon.com", "12345678910", "Jon", "password", "https://avatars1.githubusercontent.com/u/21250622?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Haris", "haris@haris.com", "12345678910", "Haris", "password", "https://avatars2.githubusercontent.com/u/19330576?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Rick", "Rick@rick.com", "12345678910", "Rick", "password", "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Zach", "Zach@zach.com", "12345678910", "Zach", "password", "https://avatars3.githubusercontent.com/u/14946412?v=3&s=460");
INSERT INTO `users` (name, email, token, username, password, thumbnail) VALUES ("Jonathan", "jonathan@Jonathan.com", "12345678910", "Jonathan", "password", "https://s30.postimg.org/spxl38nch/sadpanda.jpg");

-- Clothing

INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Neleus-Sleeve-Button-Plaid-Shirts/dp/B01KV15P1G%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01KV15P1G", "https://images-na.ssl-images-amazon.com/images/I/41x04l7sgPL.jpg", "Neleus", "Black", "mens", "$10.00", "Apparel", "SHIRT", "712383534231", "B01KV15P1G");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/French-Toast-Belted-Cargo-Khaki/dp/B01GPM5W36%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01GPM5W36", "https://images-na.ssl-images-amazon.com/images/I/41C2Zl7WKBL.jpg", "French Toast", "Khaki", "mens", "$10.00", "Apparel", "PANTS", "190444123509", "B01GPM5W36");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Converse-Chuck-Taylor-Black-Canvas/dp/B0000AFSXL%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0000AFSXL", "https://images-na.ssl-images-amazon.com/images/I/41flckPGNxL.jpg", "Converse", "Black", "mens", "$10.00", "Apparel", "SHOES", "022859473040", "B0000AFSXL");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, asin) VALUES ("https://www.amazon.com/Bienzoe-School-Uniform-sleeve-Button/dp/B01J2Y3XTE%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01J2Y3XTE", "https://images-na.ssl-images-amazon.com/images/I/31wxP4jMODL.jpg", "Bienzoe", "White", "mens", "$10.00", "Apparel", "SHIRT", "B01J2Y3XTE");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Nautica-Girls-Uniform-Stretch-Skinny/dp/B00DBNJH34%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00DBNJH34", "https://images-na.ssl-images-amazon.com/images/I/31o48IU6QTL.jpg", "Nautica", "Navy", "mens", "$10.00", "Apparel", "PANTS", "093348511055", "B00DBNJH34");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, asin) VALUES ("https://www.amazon.com/MARC-Loafers-Classic-Oxfords-Leather/dp/B019YDXMIK%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB019YDXMIK", "https://images-na.ssl-images-amazon.com/images/I/31C6jp8wgNL.jpg", "BRUNO MARC", "Black", "mens", "$10.00", "Apparel", "SHOES", "B019YDXMIK");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Guess-What-Chicken-Graphic-T-Shirt/dp/B01BE1LC6E%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01BE1LC6E", "https://images-na.ssl-images-amazon.com/images/I/41k30cI9dAL.jpg", "Humor", "Brown", "mens", "$10.00", "Apparel", "SHIRT", "797642569056", "B01BE1LC6E");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Childrens-Place-Little-Straight-Indigo/dp/B00WE4GMXO%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00WE4GMXO", "https://images-na.ssl-images-amazon.com/images/I/41p1pBa4emL.jpg", "The Children's Place", "Indigo", "mens", "$10.00", "Apparel", "PANTS", "889705033014", "B00WE4GMXO");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Skechers-Sport-Equalizer-Persistent-Sneaker/dp/B00R2KK3LW%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00R2KK3LW", "https://images-na.ssl-images-amazon.com/images/I/41gz6bt89sL.jpg", "Skechers", "Gray", "mens", "$10.00", "Apparel", "SHOES", "889110025925", "B00R2KK3LW");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Hanes-Sleeve-Raglan-Heather-X-Large/dp/B010278WAA%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB010278WAA", "https://images-na.ssl-images-amazon.com/images/I/51xx9KH--IL.jpg", "Hanes", "Gray", "mens", "$10.00", "Apparel", "SHIRT", "078715902155", "B010278WAA");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, upc, asin) VALUES ("https://www.amazon.com/Childrens-Place-Little-Uniform-Fleece/dp/B01EMLPJO4%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01EMLPJO4", "https://images-na.ssl-images-amazon.com/images/I/31lBd8aNtlL.jpg", "The Children's Place", "Black", "mens", "$10.00", "Apparel", "PANTS", "889705210316", "B01EMLPJO4");
INSERT INTO `clothing` (detailPageUrl, largeImg, brand, color, department, listPrice, productGroup, productTypeName, asin) VALUES ("https://www.amazon.com/PRINCE-Classic-Modern-Wingtip-PRINCE-6-BROWN/dp/B019X1IVWK%3Fpsc%3D1%26SubscriptionId%3DAKIAIYV2F3JA5VNKX37A%26tag%3Ddonannarni-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB019X1IVWK", "https://images-na.ssl-images-amazon.com/images/I/41%2B2bxjqk0L.jpg", "Dream Pairs", "Brown", "mens", "$10.00", "Apparel", "SHOES", "B019X1IVWK");

-- Posts

INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt, shirtId, pantId, shoesId) VALUES (3, 5, "https://images-na.ssl-images-amazon.com/images/I/41x04l7sgPL.jpg", "Check out this awesome outfit I put together! #stylin'", "image", "1484454916000", 1, 2, 3);
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt, shirtId, pantId, shoesId) VALUES (4, 3, "https://images-na.ssl-images-amazon.com/images/I/31wxP4jMODL.jpg", "Dress up. #always", "image", "1484454925000", 4, 5, 6);
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt, shirtId, pantId, shoesId) VALUES (2, 8, "https://images-na.ssl-images-amazon.com/images/I/41k30cI9dAL.jpg", "Worship the chicken. Worship it. #chicken", "image", "1484454934000", 7, 8, 9);
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt, shirtId, pantId, shoesId) VALUES (1, 23, "https://images-na.ssl-images-amazon.com/images/I/51xx9KH--IL.jpg", "Sweatpants and dress shoes go surprisingly well together. #uniq #orange4life #orangeEveryDay", "image", "1484454942000", 10, 11, 12);
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (1, 2, "https://s30.postimg.org/79wqlenrl/dog_wearing_coat_and_hat.jpg", "This is totally my dog. #legit", "image", "1484454942000");
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (3, 11, "https://ae01.alicdn.com/kf/HTB1ScHbLFXXXXa1XpXXq6xXFXXX6/Funny-font-b-Pet-b-font-font-b-Cat-b-font-Pirate-font-b-Costume-b.jpg", "Arrrrrrrrrrrrrrrrr. #cat #pirate #piratecat", "image", "1484454942000");
INSERT INTO `posts` (userId, likesCount, body, description, type, createdAt) VALUES (4, 16, "https://s23.postimg.org/tw90t5f97/2016_Yellow_Minions_Pet_Dog_Clothes_Cartoon_Dog.jpg", "Meet my new minion.", "image", "1484454942000");

-- Comments

INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (1, 4, "I am ready to meet my Maker. Whether my Maker is prepared for the great ordeal of meeting me is another matter.", "comment", "1484454944000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (1, 1, "The human body was designed by a civil engineer. Who else would run a toxic waste pipeline through a recreational area?", "comment", "1484454952000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (2, 2, "Why go to college when there's Google.", "comment", "1484454946000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (2, 3, "Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time.", "comment", "1484454945000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (3, 1, "Microsoft bought Skype for 8.5 billion... what a bunch of idiots! I downloaded it for free!", "comment", "1484454949000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (3, 4, "A good lawyer knows the law; a clever one takes the judge to lunch.", "comment", "1484454951000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (4, 3, "After one look at this planet any visitor from outer space would say “I WANT TO SEE THE MANAGER.”", "comment", "1484454952000");
INSERT INTO `posts` (postId, userId, body, type, createdAt) VALUES (4, 4, "Life is full of temporary situations, ultimately ending in a permanent solution.", "comment", "1484454950000");

-- Tags

INSERT INTO `tags` (tag, count) VALUES ("stylin'", 1);
INSERT INTO `tags` (tag, count) VALUES ("always", 1);
INSERT INTO `tags` (tag, count) VALUES ("chicken", 1);
INSERT INTO `tags` (tag, count) VALUES ("uniq", 1);
INSERT INTO `tags` (tag, count) VALUES ("orange4life", 1);
INSERT INTO `tags` (tag, count) VALUES ("orangeEveryDay", 1);
INSERT INTO `tags` (tag, count) VALUES ("legit", 1);
INSERT INTO `tags` (tag, count) VALUES ("cat", 1);
INSERT INTO `tags` (tag, count) VALUES ("pirate", 1);
INSERT INTO `tags` (tag, count) VALUES ("piratecat", 1);

-- Post/Tags Join

INSERT INTO `postTags` (postId, tagId) VALUES (1, 1);
INSERT INTO `postTags` (postId, tagId) VALUES (2, 2);
INSERT INTO `postTags` (postId, tagId) VALUES (3, 3);
INSERT INTO `postTags` (postId, tagId) VALUES (4, 4);
INSERT INTO `postTags` (postId, tagId) VALUES (4, 5);
INSERT INTO `postTags` (postId, tagId) VALUES (4, 6);
INSERT INTO `postTags` (postId, tagId) VALUES (5, 7);
INSERT INTO `postTags` (postId, tagId) VALUES (6, 8);
INSERT INTO `postTags` (postId, tagId) VALUES (6, 9);
INSERT INTO `postTags` (postId, tagId) VALUES (6, 10);

-- Followers Join

INSERT INTO `userFollowers` (userId, followerId) VALUES (1, 2);
INSERT INTO `userFollowers` (userId, followerId) VALUES (1, 3);
INSERT INTO `userFollowers` (userId, followerId) VALUES (2, 1);
INSERT INTO `userFollowers` (userId, followerId) VALUES (2, 4);
INSERT INTO `userFollowers` (userId, followerId) VALUES (3, 2);
INSERT INTO `userFollowers` (userId, followerId) VALUES (3, 4);