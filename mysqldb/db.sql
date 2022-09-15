CREATE SCHEMA app_employee DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE app_employee;


CREATE TABLE `basic_info` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`name`  varchar(100) NOT NULL,
`password`  varchar(100)  ,
`permission`  varchar(100) ,
`SSO`  varchar(100) NOT NULL,
`email`  varchar(100) NOT NULL,
`phone`  varchar(100) NOT NULL,
`base_addr`  varchar(100) NOT NULL,
`onboard_time`  timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
PRIMARY KEY (`id`),
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `training_project` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`product`  varchar(100) NOT NULL,
`self_eval`  varchar(100) NOT NULL,
`manager_eval`  varchar(50),
PRIMARY KEY (`id`),
CONSTRAINT fk_training_project FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `internal_training` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`training_format`  varchar(100) NOT NULL,
`training_prod`  varchar(100) NOT NULL,
`training_addr`  varchar(100) NOT NULL,
`start_time`  varchar(100) NOT NULL,
`end_time`  varchar(100) NOT NULL,
`training_teacher`  varchar(100) NOT NULL,
`OJT_mentor_score`  varchar(100) NOT NULL,
`OJT_mentor_eval`  varchar(100) NOT NULL,
PRIMARY KEY (`id`),
CONSTRAINT fk_internal_training FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `OKR` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`project_name`  varchar(100) NOT NULL,
`is_leader`  tinyint(1),
`content`  varchar(1000) NOT NULL,

PRIMARY KEY (`id`),
CONSTRAINT fk_OKR FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `award` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`award_time`  timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '获奖时间',
`award_detail`  varchar(1000) NOT NULL,

PRIMARY KEY (`id`),
CONSTRAINT fk_award FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `night_school` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`ns_time`  timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '夜校时间',
`ns_detail`  varchar(1000) NOT NULL,

PRIMARY KEY (`id`),
CONSTRAINT fk_night_school FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

CREATE TABLE `career` (
`id`  bigint NOT NULL AUTO_INCREMENT ,
`em_id`  bigint NOT NULL,
`start_time`  timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT'开始时间',
`end_time`  timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '结束时间',
`company_name`  varchar(1000) NOT NULL,

PRIMARY KEY (`id`),
CONSTRAINT fk_career FOREIGN KEY(`em_id`) REFERENCES `basic_info`(`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
;

SET FOREIGN_KEY_CHECKS=1;


