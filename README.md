# Edirect Project Manager

Hello, this is a simple project made within 48 hours. 
Back-end: Node.js
Front-end: React ( Redux )

## Screens

### Login
![login](https://raw.githubusercontent.com/Toshiuk/edirect-task-manager/master/screens/login.png)

### Register
![register](https://raw.githubusercontent.com/Toshiuk/edirect-task-manager/master/screens/register.png)

### Dashboard
![dashboard](https://raw.githubusercontent.com/Toshiuk/edirect-task-manager/master/screens/dashboard.png)

## Instructions

To run this project you will need follow those steps

### Prerequisites

* npm or yarn
* sequelize 
* postgres


### Starting API

First thing you need to configure your DB in "/api/config/config.json" than run :
```
$ cd api
$ yarn (or npm install)
$ sequelize db:create
$ sequelize db:migrate 
$ yarn start (or npm start)
```

### Starting UI

```
$ cd ui
$ yarn (or npm install)
$ yarn start (or npm start)
```