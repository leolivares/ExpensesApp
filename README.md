# Expenses App :dollar:

Expenses app is a web app created with the objective of helping users manage their expenses, as well as allow them to learn and visualize how their money is spent.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To start the app, docker is all you need

```
docker
```

### Running the App

Once docker is installed and running, follow this steps

Navigate to the repository directory.

```
cd ExpensesApp
```

Build and run the docker service

```
docker-compose up --build
```

## Development Tools

- To access a container with docker use:

``` python
docker exec -it <container-name> /bin/bash

# Project Example
docker exec -it expensesapp_expenses-api_1 /bin/bash # (API Container)
docker exec -it expensesapp_postgres_1 /bin/bash # (PSQL Container)
```
- To access the postgres database through the terminal
    * Once inside the container
        ``` python
        psql -U postgres
        ```
    * or via TCP connection
        ``` python
        psql -U postgres -h localhost -p 5432
        ```
- Working with Sequelize
    * To generate a new model with the migration:
        ``` python
        cd server
        #Example
        node_modules/.bin/sequelize model:generate --name User --attributes firstName:string lastName:string,email:string
        ```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Docker](https://www.docker.com/) - Virtualization service.
* [Express](https://expressjs.com/) - Node JS web application framework.
* [React](https://reactjs.org/) - JS user interface library.
* [NPM](https://www.npmjs.com/) - Node Package Manager.
* [Sequelize](https://sequelize.org/) - Promise based Node.js ORM.

## Authors

* **Leonardo Olivares** - [leolivares](https://github.com/leolivares)

## Acknowledgments

