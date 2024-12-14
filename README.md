
# Task-Management to-do app

I developed the to-do list application consisting of both a backend API and a frontend web application, following the provided assignments.
## Tech Stack

**Frontend:** Next.js, TailwindCSS

**Backend:** Node, mysql2(client)

## make sure .env.local file is in the directory too while cloning... if not then create one and add following - 

```bash
DB_HOST=localhost
DB_PORT=3307
DB_USER=aryan
DB_PASSWORD=192002
DB_NAME=dockerdb
JWT_SECRET=315a47ed971d16b09360834b2668fc9034fed39cd96c30998d586a7479c13e0645549bfc99162abc3a64a259511235634c103a23c72c5491c25481bf8538c160

```

## Features

- POST /tasks: Create a new task with title (string), description (string), and status (default: "pending").
- GET /tasks: Fetch all tasks.
- PUT /tasks/:id: Update the task status (pending, in-progress, completed).
- DELETE /tasks/:id: Delete a task by its ID.

## Additional Features

- Added JWT-based authentication by adding tokens in cookie for API endpoints.
-  Used TailwindCSS for frontend.

## screenshot 

<img src="/login.png" alt="login page" style="float: left; margin-right: 10px;" width="200" />
<img src="/app.png" alt="app page" style="float: left; margin-right: 10px;" width="200" />
<img src="/task_empty.png" alt="new task" style="float: left; margin-right: 10px;" width="200" />
<img src="/task_example.png" alt="example to-do app page" style="float: left; margin-right: 10px;" width="200" />
<img src="/task_example_completed_status.png" style="float: left; margin-right: 10px;" alt="change stauts to completed" width="200" />

### Folder/File Explanations

- **`src/`**: Contains all the source code of the app.
  - **`api/`**: Backend API folder containg the REST APIs.
    - **`auth/`**
      - **`createtask/`**: POST.
      - **`login/`**
      - **`logout/`**
      - **`signup/`**
      - **`tasks/`**
        - **`completed/`**: UPDATE to 'completed' WHERE :id
        - **`deleted/`**: DELETE WHERE :id
        - **`inprogress/`**: UPDATE to 'inprogress' WHERE :id
        - **`pending/`** UPDATE to 'pending' WHERE :id (DEFAULT in database)
    - **`tasks/`**
      - **`auth/`**: GET tasks data
    - **`users/`**
      - **`auth/`**: GET users data.
  - **`createtask/`**
  - **`login/`**
  - **`signup/`**
  - **`database.js`**
  - **`page.js`**
  - **`loading.js`**
- **`.env.local`**: Contains JWT secret key and database information.
- **`middleware.js`**: Protects routes with authentication and 
- **`package.json`**:
- **`tailwind.config.js`**: Custom modules for some elements. 
- **`README.md`**: Documentation for the project.



## Installation

```bash
git clone https://github.com/aar-yan19/todoapp.git
```

```bash
cd next
```

```bash
npm install
```

```bash
npm run dev
```

This will start the Next.js app on http://localhost:3000 by default.

Now setup the ``` docker-compose.yml ``` configuration file for the container to initiate the database. 


```bash
version: '3.8'

services:
  db:
    image: mysql:latest
    container_name: nextaryandb
    environment:
      MYSQL_ROOT_PASSWORD: 192002
      MYSQL_DATABASE: dockerdb
      MYSQL_USER: aryan
      MYSQL_PASSWORD: 192002
    ports:
      - "3307:3306"
    volumes:
        - "./db:/var/lib/mysql"

```

Run ``` docker compose up ```. This will create a ``` db ``` folder in your directory. 

Now, import the ``` dockerdb_schema.sql ``` dump file in your docker directory - 


```bash
docker exec -i nextaryandb mysql -u aryan -p192002 dockerdb < dockerdb_schema.sql

```

``` mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.3.0, for Linux (aarch64)
--
-- Host: localhost    Database: dockerdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('pending','in-progress','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-13 21:54:49
 ```

Now you will have a working nextjs application with a docker container for database running. 

To access the mysql database, use -

``` docker exec -it nextaryandb  mysql -u aryan -p ```

DO NOT change any configuration of database or container. If you do, make sure to change it wherever referenced to avoid conflicts.

