-- CREATE TABLE "news" -----------------------------------------
CREATE TABLE `news`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`title` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`contents` Text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`school_id` Int( 0 ) NOT NULL,
	`admin_id` Int( 0 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE INDEX "idx_news_school_id" --------------------------------
CREATE INDEX `idx_news_school_id` ON `news`( `school_id` );-- -------------------------------------------------------------

-- CREATE INDEX "idx_news_admin_id" --------------------------------
CREATE INDEX `idx_news_admin_id` ON `news`( `admin_id` );-- -------------------------------------------------------------
