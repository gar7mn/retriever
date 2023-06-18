# retriever

A web interface for querying with mysql.
The end goal is for this to function lika a primitive search engine that searches a database.

# Launching the app.
open the directory on a terminal and run:
```
npm run start
```
# MYSQL database account table design
```
CREATE TABLE `accounts` (
  `id` double NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
```
# MYSQL database directory table design
```
CREATE TABLE `directory` (
  `id` double NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `number` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
```
More updates are coming.
