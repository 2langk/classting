-- CREATE TABLE "config" ---------------------------------------
CREATE TABLE `config`( 
	`id` Int( 0 ) NOT NULL,
	`type` Enum( 
    'domainEvent',
		'subscription_status',
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
	`aggregate` Enum( 'news', 'school', 'subscription', 'user' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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

( 0301,'domainEvent','subscription_created','구독생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 0302,'domainEvent','subscription_canceled','구독취소',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 0401,'domainEvent','user_created','유저생성',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 3001,'subscription_status','admin','관리자 전용',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 3002,'subscription_status','manage','관리',3001,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 3011,'subscription_status','student','학생 전용',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 3012,'subscription_status','subscribe','구독중',3011,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 3013,'subscription_status','cancel','구독취소',3011,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),

( 4001,'user_role','operator','운영자',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 4002,'user_role','admin','관리자',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' ),
( 4003,'user_role','student','학생',NULL,'2024-03-13 00:00:00','2024-03-13 00:00:00' )