-- CREATE TABLE "user" -----------------------------------------
CREATE TABLE `user`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`email` VarChar( 32 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`password` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`name` VarChar( 32 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `ux_user_email` UNIQUE( `email` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE TABLE "user_role" -----------------------------------------
CREATE TABLE `user_role`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`user_id` Int( 0 ) NOT NULL,
	`config_id` Int( 0 ) NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `ux_user_role_user_id_config_id` UNIQUE( `user_id`, `config_id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE LINK "fk_user_role_config_id" --------------------------
ALTER TABLE `user_role`
	ADD CONSTRAINT `fk_user_role_config_id` FOREIGN KEY ( `config_id` )
	REFERENCES `config`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------

-- CREATE LINK "fk_user_role_user_id" ----------------------------
ALTER TABLE `user_role`
	ADD CONSTRAINT `fk_user_role_user_id` FOREIGN KEY ( `user_id` )
	REFERENCES `user`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------