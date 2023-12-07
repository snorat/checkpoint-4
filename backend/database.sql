CREATE TABLE user (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  -- `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `hashedPassword` VARCHAR(100) NOT NULL,
 `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


CREATE TABLE post (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATE NOT NULL,
  `created_time` TIME NOT NULL,
  PRIMARY KEY (`post_id`),
  CONSTRAINT `fk_user_post`
    FOREIGN KEY (`user_id`)
    REFERENCES user (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE images (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `image_1` VARCHAR(255),
  

  PRIMARY KEY (`image_id`),

  CONSTRAINT `fk_post_images`
  FOREIGN KEY (`post_id`)
  REFERENCES post(`post_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE favorite (
  `favorite_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`favorite_id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES user (`user_id`),
  CONSTRAINT `fk_post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES post (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE followers (
  `follower_id` INT NOT NULL,
  `followed_id` INT NOT NULL,
  PRIMARY KEY (`follower_id`, `followed_id`),
  CONSTRAINT `fk_follower_id`
    FOREIGN KEY (`follower_id`)
    REFERENCES user (`user_id`),
  CONSTRAINT `fk_followed_id`
    FOREIGN KEY (`followed_id`)
    REFERENCES user (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`,`registration_date`) 
VALUES ('saima', 'NORAT', 'Saima@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HR/lNvZ6zWRH4ObyGrlMtw$7wAqMGtpdJaSFYCmTPnV+gTaX7dwy0KC4cXhVyC5/Ks', CURRENT_TIMESTAMP);
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`, `registration_date`) 
VALUES ('John', 'Doe', 'john.doe@example.com', '$argon2id$v=19$m=65536,t=5,p=1$ABC123...', CURRENT_TIMESTAMP);
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`, `registration_date`) 
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$argon2id$v=19$m=65536,t=5,p=1$XYZ789...', CURRENT_TIMESTAMP);
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`, `registration_date`) 
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$argon2id$v=19$m=65536,t=5,p=1$LMN456...', CURRENT_TIMESTAMP);

INSERT INTO post (`user_id`, `content`, `created_at`, `created_time`) VALUES (1, 'Création de mon premier post X + test de plein de fonctionalités', '2023-12-06', '12:30:00');
INSERT INTO post (`user_id`, `content`, `created_at`, `created_time`) 
VALUES (2, 'This is my first post!', '2023-12-06', '14:45:00');
INSERT INTO post (`user_id`, `content`, `created_at`, `created_time`) 
VALUES (3, 'Just posted something interesting!', '2023-12-06', '15:30:00');

INSERT INTO images (`image_id`, `post_id`, `image_1`) VALUES (1, 1, 'https://chatfaitdubien.fr/wp-content/uploads/2016/12/800_600____2__pension-chat-63_36.jpg');
