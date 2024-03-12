-- CREATE TABLE "subscribe" -----------------------------------------
CREATE TABLE `subscribe`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`school_id` Int( 0 ) NOT NULL,
	`user_id` Int( 0 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `ux_subscribe_school_id_user_id` UNIQUE( `school_id`, `user_id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE INDEX "idx_subscribe_school_id" --------------------------------
CREATE INDEX `idx_subscribe_school_id` ON `subscribe`( `school_id` );-- -------------------------------------------------------------

-- CREATE INDEX "idx_subscribe_user_id" --------------------------------
CREATE INDEX `idx_subscribe_user_id` ON `subscribe`( `user_id` );-- -------------------------------------------------------------

-- CREATE TABLE "subscribe_status" -----------------------------------------
CREATE TABLE `subscribe_status`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`subscribe_id` Int( 0 ) NOT NULL,
	`config_id` Int( 0 ) NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `ux_subscribe_status_subscribe_id_config_id` UNIQUE( `subscribe_id`, `config_id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE LINK "fk_subscribe_config_id" --------------------------
ALTER TABLE `subscribe`
	ADD CONSTRAINT `fk_subscribe_config_id` FOREIGN KEY ( `config_id` )
	REFERENCES `config`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------

-- CREATE LINK "fk_subscribe_subscribe_id" ----------------------------
ALTER TABLE `subscribe`
	ADD CONSTRAINT `fk_subscribe_subscribe_id` FOREIGN KEY ( `subscribe_id` )
	REFERENCES `subscribe`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------