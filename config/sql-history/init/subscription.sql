-- CREATE TABLE "subscription" -----------------------------------------
CREATE TABLE `subscription`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`school_id` Int( 0 ) NOT NULL,
	`user_id` Int( 0 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `ux_subscription_school_id_user_id` UNIQUE( `school_id`, `user_id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE INDEX "idx_subscription_school_id" --------------------------------
CREATE INDEX `idx_subscription_school_id` ON `subscription`( `school_id` );-- -------------------------------------------------------------

-- CREATE INDEX "idx_subscription_user_id" --------------------------------
CREATE INDEX `idx_subscription_user_id` ON `subscription`( `user_id` );-- -------------------------------------------------------------

-- CREATE TABLE "subscription_status" -----------------------------------------
CREATE TABLE `subscription_status`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`subscription_id` Int( 0 ) NOT NULL,
	`config_id` Int( 0 ) NOT NULL,
	`processedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE LINK "fk_subscription_status_config_id" --------------------------
ALTER TABLE `subscription_status`
	ADD CONSTRAINT `fk_subscription_status_config_id` FOREIGN KEY ( `config_id` )
	REFERENCES `config`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------

-- CREATE LINK "fk_subscription_status_subscription_id" ----------------------------
ALTER TABLE `subscription_status`
	ADD CONSTRAINT `fk_subscription_status_subscription_id` FOREIGN KEY ( `subscription_id` )
	REFERENCES `subscription`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------