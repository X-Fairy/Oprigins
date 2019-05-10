SET NAMES UTF8;
DROP DATABASE IF EXISTS origins;
CREATE DATABASE origins CHARSET=UTF8;
USE origins;
CREATE TABLE origin_product(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(64),
	title VARCHAR(32),
	subtitle VARCHAR(32),
	price 	INT
);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/1.gif","Out of Trouble Mask","矿物泥奇迹面膜套装",200);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/2.jpg","Dr.ANDREW WELL FRO ORIGINS","灵芝肌底修护套装",680);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/3.jpg","Dr.Andrew Weil for Origins","灵芝双星套装",1000);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/4.jpg","Drink Up Intensive Mask","水润畅饮夜间面膜套装",240);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/5.jpg","Clear Improvement","炭瓷膜套装",200);
INSERT INTO origin_product VALUES(null,"http://127.0.0.1:3000/product/6.jpg","plantscription","榆木青春紧弹精华眼霜套装",380);
CREATE TABLE origin_shopCar(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(128),
	title VARCHAR(128),
	price INT,
	count INT,
	lid INT
);
INSERT INTO origin_shopCar VALUES(null,'http://127.0.0.1:3000/product/1.gif','矿物泥奇迹面膜套装',200,1,1);