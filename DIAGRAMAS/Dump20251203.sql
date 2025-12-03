-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_ecom
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(70) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(70) NOT NULL,
  `localidade` varchar(70) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numero` varchar(12) NOT NULL,
  `dataEstimada` date DEFAULT NULL,
  `codigoRastreio` varchar(50) DEFAULT NULL,
  `statusEntrega` enum('EM_TRANSITO','SAIU_PARA_ENTREGA','ENTREGUE','EXTRAVIADO') NOT NULL DEFAULT 'EM_TRANSITO',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEntrega`),
  UNIQUE KEY `idPedido` (`idPedido`),
  UNIQUE KEY `codigoRastreio` (`codigoRastreio`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,1,'88200-486','Rua Independência','ds','Praça','Tijucas','SC','123',NULL,NULL,'EM_TRANSITO','2025-12-03 03:33:25','2025-12-03 03:33:25'),(2,2,'88200-486','Rua Independência','ds','Praça','Tijucas','SC','123',NULL,NULL,'EM_TRANSITO','2025-12-03 03:57:08','2025-12-03 03:57:08');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `codEstoque` int NOT NULL AUTO_INCREMENT,
  `idProduto` int NOT NULL,
  `quantidade_atual` int DEFAULT '0',
  `quantidade_minima` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEstoque`),
  UNIQUE KEY `idProduto` (`idProduto`),
  CONSTRAINT `estoques_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
INSERT INTO `estoques` VALUES (1,9,11,0,'2025-12-03 03:33:34','2025-12-03 03:33:34'),(2,10,11,0,'2025-12-03 03:39:39','2025-12-03 03:39:39');
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedidos`
--

DROP TABLE IF EXISTS `itens_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_pedidos` (
  `codItemPedido` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `idProduto` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `precoUnitario` decimal(10,2) NOT NULL,
  `valorTotalItem` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`codItemPedido`),
  UNIQUE KEY `itens_pedidos_id_pedido_id_produto` (`idPedido`,`idProduto`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `itens_pedidos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_pedidos_ibfk_2` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedidos`
--

LOCK TABLES `itens_pedidos` WRITE;
/*!40000 ALTER TABLE `itens_pedidos` DISABLE KEYS */;
INSERT INTO `itens_pedidos` VALUES (1,1,2,1,1467000.00,1467000.00),(2,2,9,1,101.00,101.00),(3,2,2,5,1467000.00,7335000.00);
/*!40000 ALTER TABLE `itens_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `codPedido` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `dataPedido` datetime NOT NULL,
  `status` enum('PENDENTE_PAGAMENTO','PAGO','ENVIADO','ENTREGUE','CANCELADO') NOT NULL DEFAULT 'PENDENTE_PAGAMENTO',
  `valorSubtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorFrete` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codPedido`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,1,'2025-12-03 03:33:25','PENDENTE_PAGAMENTO',1467000.00,864.00,1467864.00,'2025-12-03 03:33:25','2025-12-03 03:33:25'),(2,1,'2025-12-03 03:57:08','PENDENTE_PAGAMENTO',7335101.00,588.00,7335689.00,'2025-12-03 03:57:08','2025-12-03 03:57:08');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `modelo` varchar(50) NOT NULL,
  `preco` decimal(65,2) NOT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Porsche 911 Turbo S','O topo da linha 911. Agora com tecnologia T-Hybrid, combinando motor boxer biturbo com sistema elétrico. É o 911 mais rápido e avançado da geração 992.2.','911 Turbo S',2100000.00,'../public/imgs/911TurboS.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(2,'Porsche 911 GT3','Versão de pista, leve, agressiva e com motor aspirado. É o modelo favorito dos puristas e entusiastas de track day.','911 GT3',1467000.00,'../public/imgs/911GT3.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(3,'Porsche 911 Carrera GTS','Equilíbrio perfeito entre luxo e esportividade. Usa sistema T-Hybrid, com desempenho forte porém mais civilizado que o Turbo.','911 Carrera GTS',1127000.00,'../public/imgs/911CarreraGTS.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(4,'Porsche Taycan Turbo S','O elétrico mais potente “padrão” da Porsche. Desempenho extremo, aceleração brutal e engenharia elétrica de ponta.','Taycan Turbo S',1435000.00,'../public/imgs/TaycanTurboS.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(5,'Porsche Taycan Turbo GT','Versão superesportiva, mais focada em performance extrema do que qualquer outro Taycan. Pegada de supercarro elétrico.','Taycan Turbo GT',1535000.00,'../public/imgs/TaycanTurboGT.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(6,'Porsche Taycan 4S Cross Turismo','A combinação ideal de praticidade e esportividade. Estilo perua esportiva com tração integral e autonomia sólida.','Taycan 4S Cross Turismo',935000.00,'../public/imgs/Taycan4SCrossTurismo.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(7,'Porsche Panamera Turbo S E-Hybrid','Sedã de luxo rápido, híbrido plug-in. Motor V8 turbo combinado com motor elétrico. Muito potente e eficiente.','Panamera Turbo S E-Hybrid',1573000.00,'../public/imgs/PanameraTurboSE-Hybrid.jpg',1,'2025-12-03 03:31:11','2025-12-03 03:31:11'),(9,'wqe','sdasdasd','911',101.00,'https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=323857&w=1440&h=812&crop=1&public=1&cs=9c8d86c8e1c1cc56',1,'2025-12-03 03:33:34','2025-12-03 03:33:34'),(10,'wqe','sdasdasd','911',101.00,'https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=323857&w=1440&h=812&crop=1&public=1&cs=9c8d86c8e1c1cc56',1,'2025-12-03 03:39:39','2025-12-03 03:39:39'),(11,'Porsche Panamera GTS','Versão esportiva...','Panamera GTS',803000.00,'/imgs/PanameraGTS.jpg',1,'2025-12-03 04:02:08','2025-12-03 04:02:08');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `identidade` varchar(20) DEFAULT NULL,
  `tipo_usuario` enum('CLIENTE','ADMIN') NOT NULL DEFAULT 'CLIENTE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codUsuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'joao','jv@gmail.com.br','$2b$10$/hwXRHn7jClqXOt1qc8ETeJJALdxfu4kLTXlpViQxnGDOGXylS8BK','(48)99971-9210','11331856906',NULL,'ADMIN','2025-12-03 03:32:49','2025-12-03 03:33:30');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03  1:04:36
