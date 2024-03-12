-- CREATE TABLE "school" -----------------------------------------
CREATE TABLE `school`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 32 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`region` VarChar( 32 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

# todo: region 정규화