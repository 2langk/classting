-- CREATE TABLE "config" ---------------------------------------
CREATE TABLE `config`( 
	`id` Int( 0 ) NOT NULL,
	`type` Enum( 
    'domainEvent',
		'subscribe_status',
    'user_role'
	) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`name` VarChar( 64 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`description` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`parent_id` Int( 0 ) NULL DEFAULT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE INDEX "idx_config_type" --------------------------------
CREATE INDEX `idx_config_type` ON `config`( `type` );-- -------------------------------------------------------------

-- CREATE INDEX "idx_config_parent_id" --------------------------------
CREATE INDEX `idx_config_parent_id` ON `config`( `parent_id` );-- -------------------------------------------------------------

-- CREATE TABLE "domainEvent" -----------------------------------------
CREATE TABLE `domainEvent`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`aggregate` Enum( 'news', 'school', 'subscribe', 'user' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`aggregate_id` Int( 0 ) NOT NULL,
	`config_id` Int( 0 ) NOT NULL,
	`status` Enum( 'ready', 'progress', 'done', 'fail' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
	`errorLog` VarChar( 10000 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
	`processedAt` DateTime,
	`createdAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
ENGINE = InnoDB;-- -------------------------------------------------------------

-- CREATE INDEX "idx_domainEvent_status" ------------------------------
CREATE INDEX `idx_domainEvent_status` ON `domainEvent`( `status` );-- -------------------------------------------------------------

-- CREATE LINK "fk_domainEvent_config_id" --------------------------
ALTER TABLE `domainEvent`
	ADD CONSTRAINT `fk_domainEvent_config_id` FOREIGN KEY ( `config_id` )
	REFERENCES `config`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;-- -------------------------------------------------------------

INSERT INTO `config` (`id`,`type`,`name`,`description`,`parent_id`,`createdAt`,`updatedAt`) VALUES 
( 0101,'domainEvent','news_created','소식생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 0102,'domainEvent','news_updated','소식수정',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 0103,'domainEvent','news_deleted','소식삭제',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 0201,'domainEvent','school_created','학교생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 0301,'domainEvent','subscribe_created','구독생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 0302,'domainEvent','subscribe_canceled','구독취소',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 0401,'domainEvent','user_created','유저생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 3001,'subscribe_status','manage','관리중',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 3002,'subscribe_status','subscribe','구독중',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 3003,'subscribe_status','cancel','취소중',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 4001,'user_role','operator','운영자',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 4002,'user_role','admin','관리자',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 4003,'user_role','student','학생',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' )