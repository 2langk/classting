SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'local_db';

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `config`;
DROP TABLE IF EXISTS `domainEvent`;
DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `school`;
DROP TABLE IF EXISTS `subscribe`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `user_role`;
SET FOREIGN_KEY_CHECKS = 1;
