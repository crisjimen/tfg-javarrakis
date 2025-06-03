-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: javarrakis
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `difficulty` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'Prueba de Arrakis','1'),(2,'Mensajero Fremen','1'),(3,'Control de la especia','2');
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reputation_level`
--

DROP TABLE IF EXISTS `reputation_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reputation_level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `min_points` int NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reputation_level`
--

LOCK TABLES `reputation_level` WRITE;
/*!40000 ALTER TABLE `reputation_level` DISABLE KEYS */;
INSERT INTO `reputation_level` VALUES (1,'Acólito del Desierto',0,'Apenas ha pisado Arrakis. Sus errores son como gusanos de arena: surgen por cualquier movimiento en falso. Le teme al compilador como los fremen temen al agua desperdiciada.'),(2,'Explorador del Arrakeen.log',100,'Comienza a entender el código, pero aún imprime todo en la consola como si fuera un mensaje a los Navegantes. Descubrir el debugger será su ritual de paso.'),(3,'Nómada del Bucle Infinito',300,'Ha aprendido a sobrevivir en el desierto... pero vive atrapado en bucles sin fin, como si se hubiera metido en una tormenta de arena lógica.'),(4,'Guerrero del If-Else',600,'Lucha con condicionales como un Fremen contra los Sardaukar. Su código tiene más ramas que un jardín en Caladan. Espera encontrar el switch como quien busca especia.'),(5,'Mentat de Clases',1000,'Comienza a ver patrones. Domina la POO, aunque aún le teme a la herencia múltiple más que al Barón Harkonnen.'),(6,'Asesino del NullPointer',1500,'Tras muchas batallas, ha erradicado el NullPointer. Su alma está marcada. Se convirtió en lo que juró destruir... y ahora nada lo detiene.'),(7,'Domador de Excepciones Espaciotemporales',2000,'Cada error lo analiza como un Mentat. Si su consola habla, él responde. Se siente un Hacker de la Cofradía.'),(8,'Kwisatz Refactorach',2500,'Ve todos los caminos posibles del código y los limpia con elegancia. Refactoriza como si fuera un Litany Against Code Smell.'),(9,'Sabio del Shai-Hulud Overflow',3000,'Ya no escribe código. Lo presiente. Su conocimiento trasciende IDEs. Hasta ChatGPT consulta sus commits. Su sabiduría fluye como la especia.');
/*!40000 ALTER TABLE `reputation_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` bigint NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `reputation_id` bigint DEFAULT '1',
  `points` int DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  KEY `reputation_id` (`reputation_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`reputation_id`) REFERENCES `reputation_level` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (271075961173133470,'crisjimnz','cj38696@gmail.com',1,0,NULL,'2025-05-27 18:07:42','$argon2i$v=19$m=65536,t=2,p=1$aRixM7yeFS7g/CkL0NU4JQ$oe8f03qgSAvSj8n2xhNXs2AwCbAdZucH130lSH0nsRg'),(1643751330611545966,'jimenezperezcristina3@gmail.com','jimenezperezcristina3@gmail.com',1,30,'2025-05-28 16:36:15','2025-05-27 18:10:48','$argon2i$v=19$m=65536,t=2,p=1$6/JqTPpJL4w/ho3c8IJ/3Q$YtZGhbLMGM3TAS0CP7mR20czW+jqLpV/NhhCM/rF+5Y'),(3865416539220166091,'prueba','prueba@gmail.com',1,45,'2025-06-03 18:54:37','2025-06-03 18:50:12','$argon2i$v=19$m=65536,t=2,p=1$ud4JQFihGYjPREb/6FHzYg$QAChTuiZvWsPTuqoNe1Hldb0Lk2jBDkACo+fQO00Ukc');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_progress`
--

DROP TABLE IF EXISTS `user_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_progress` (
  `user_id` bigint NOT NULL,
  `level_id` bigint NOT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `score` int DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`level_id`),
  KEY `level_id` (`level_id`),
  CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
  CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_progress`
--

LOCK TABLES `user_progress` WRITE;
/*!40000 ALTER TABLE `user_progress` DISABLE KEYS */;
INSERT INTO `user_progress` VALUES (1643751330611545966,1,1,10,'2025-06-02 10:54:48'),(3865416539220166091,1,1,10,'2025-06-03 18:51:17'),(3865416539220166091,2,1,15,'2025-06-03 18:51:44'),(3865416539220166091,3,1,20,'2025-06-03 18:53:14');
/*!40000 ALTER TABLE `user_progress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 23:04:47
