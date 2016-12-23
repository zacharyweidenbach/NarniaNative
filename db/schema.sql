CREATE TABLE `Users` (
    `id` INT AUTO_INCREMENT,
    `post_count` INT NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Posts` (
    `id` INT AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `body` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `User_Posts` (
    `id` INT AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Tags` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `parent` INT NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Tags_Join` (
    `tag_id` INT AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `clothing_id` INT NOT NULL
);
CREATE TABLE `Clothing` (
    `id` INT AUTO_INCREMENT,
    `types` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `tags` INT NOT NULL,
    PRIMARY KEY (`id`)
);
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE `User_Posts` ADD CONSTRAINT `User_Posts_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE `User_Posts` ADD CONSTRAINT `User_Posts_fk1` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`);
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_fk0` FOREIGN KEY (`parent`) REFERENCES `Tags`(`id`);
ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk0` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`);
ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk1` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`);
ALTER TABLE `Tags_Join` ADD CONSTRAINT `Tags_Join_fk2` FOREIGN KEY (`clothing_id`) REFERENCES `Clothing`(`id`);
ALTER TABLE `Clothing` ADD CONSTRAINT `Clothing_fk0` FOREIGN KEY (`tags`) REFERENCES `Tags_Join`(`tag_id`);