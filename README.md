# Sensgreen Case Study
**REST API of Firms, Users and Buildings ( Node.js, Express, PostgreSQL, Redis, Docker & Docker-Compose )**



## About Implementation Details

- Tech stack : Node.js, PostgreSQL, Express, Redis, Docker & Docker-Compose
- **Redis** is used to cache incoming API requests. Once a data saved (insert, update, delete) in database, application is also save the data in Redis. When the request is came, the data is taken from the cache for efficiency.
- Whole application is **Dockerized** to fast and efficient deployment. 
- **Postman** collection file is provided to test study.
- Application **validates API requests** by [**Joi**](https://www.npmjs.com/package/joi) as _express middleware_. If a request is invalid, user gets detailed (parametrized) error message. 
- [**Node-pg**](https://www.npmjs.com/package/pg) is used as a _PostgreSQL Client_. Node-pg is a _driver-level_ client that provides very efficient _pooling_ and _transaction_ mechanism. Also, it provides _parametrized queries_ that provides parameter type checking and safe querying. Connection pooling, transaction, and parametrized queries are used in the application. 
 

## Setup & Run


- Install [Docker](https://docs.docker.com/engine/install/) and [Docker-Compose](https://docs.docker.com/compose/install/) to your computer.
- Clone repository to your computer.
- Open the terminal and go to the repository folder location.


#### Setup and build project environment (docker images and containers) by docker-compose :
```sh
docker-compose build
```

#### Run the REST API application :

This command runs the application.
```sh
docker-compose up
```
Now, application is listening to requests and ready for tests...


#### Testing

[Click here](https://github.com/yasin-cs-3244/sensgreen-case-study/blob/main/Sensgreen%20Case.postman_collection.json) to download Postman Collection.

You can open the collection in [Postman Application](https://www.postman.com/downloads/) and test with different parameters.

