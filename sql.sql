SELECT * FROM fandb.Users;CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postcode` varchar(20) DEFAULT NULL,
  `fullAddress` text,
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carts` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`user_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `menuitemingredients` (
  `menu_item_ingredient_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `ingredient_id` int DEFAULT NULL,
  `quantity_required` int DEFAULT NULL,
  PRIMARY KEY (`menu_item_ingredient_id`),
  UNIQUE KEY `item_id` (`item_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `menuitemingredients_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menuitems` (`item_id`) ON DELETE CASCADE,
  CONSTRAINT `menuitemingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `menuitems` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `availability` tinyint(1) DEFAULT '1',
  `category` enum('Food','Beverage','Special') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nutritionalinfo` (
  `nutritional_info_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `calories` int DEFAULT NULL,
  `carbs` int DEFAULT NULL,
  `proteins` int DEFAULT NULL,
  `fats` int DEFAULT NULL,
  PRIMARY KEY (`nutritional_info_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `nutritionalinfo_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `menuitems` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orderitems` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `menuitems` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notifications` (
  `nof_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('new','done','repaired','ingredient','failed') DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nof_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Processing','Packed','Delivering','Delivered','Successfully','Cancelled') DEFAULT NULL,
  `shipper_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shipper` (
  `user_id` int NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `point` int DEFAULT NULL,
  `availability_status` enum('active','off','delivering') DEFAULT NULL,
  `last_active` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `shipper_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staffId` int NOT NULL,
  `staffName` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `about` text,
  `phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
  `role` enum('user','admin','cashier','chef','shipper') NOT NULL DEFAULT 'user',
  `status` enum('pending','active','off','banned') NOT NULL DEFAULT 'pending',
  `point` int DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
