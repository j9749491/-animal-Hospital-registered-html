
CREATE TABLE `MEMBET`
(
  `name` VARCHAR(25) NOT NULL,
  `id` CHAR(10) NOT NULL,
  `sex` CHAR(2) NOT NULL,
  `phone` CHAR(10) NOT NULL,
  `pwd` VARCHAR(50) NOT NULL,
  `age` INT(5) NOT NULL,
  `Online` CHAR(20) NOT NULL default '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `phone` (`phone`)
);
CREATE TABLE `Registration`
(
  `Rname` VARCHAR(50) NOT NULL,
  `Rtime` VARCHAR(50) NOT NULL,
  `Rnumber` Int(50) NOT NULL,
  `RDate` Date NOT NULL,
  `id` CHAR(10) NOT NULL,
  PRIMARY KEY (`RDate`),
  UNIQUE KEY `Rnumber` (`Rnumber`),
  FOREIGN KEY (`id`) REFERENCES MEMBET(`id`)
);


html