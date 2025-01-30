# Todo App (PERN Stack - Postgres, Express, React, and Node)

Todo App using React, ExpressJS and PostGress


## Built with:

* React.js
* JavaScript
* Node.js
* Express
* PostgreSQL
* CORS - Cross-Origin Resource Sharing

## Deployed with:

* Deployed using Render (PostgreSQL Database, Backend Webservice & Frontend Static Site)

## Project Setup & Running:

* Prerequisites
  * Install Node.js
  * Install [postgres]

* Before starting the project, follow these steps to create project and get your server up and running:

  * `mkdir server` - starting our server
  * `cd server`
  * `npm init` - is going to keep track of all our packages inside the application
  * `npm install express pg cors` - express allows us to quickly create a server in Node.js, cors allows different domain applications to interact with each other (server will be running on localhost:5000 & React App on localhost:3000, postgres is there to connect our server with our database in order to run postgres queries)
  * `touch index.js` - require the libraries in this file, app.listen to start server, app.use to create middlewear (express, cors)
  * `npm install -g nodemon`
  * `nodemon index` - will watch index.js file, every time there's a change it will instantly restart it
  * `cd client\to-do-app`
  * `npx create-react-app client` - setting up client side with React
  * `npm start` - to get client side started



