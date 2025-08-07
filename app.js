// What is express?
// Express is used to create web server in node. Express works on a middlware concept (callback functions).
const express = require("express");
// MySQL import for creating a connection to MYSQL Server.
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "task_manager",
  password: "password",
  port: "3307",
});

// A simple SELECT query
connection.query("SELECT * FROM `users`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});

// cors is a middleware that allows us to make requests to the backend server from different domains.
var cors = require("cors");
const app = express();

// use cors middleware
app.use(cors());

// A middleware is a function that has access to the request and response object
// you can think of a middleware as a layer that sits between the request and response.
function customMiddleware(req, res, next) {
  console.log("Middleware function called!");
  // next function is called to move onto the next middleware function
  next();
}

// use the middleware function when a request comes in from the web.
app.use(customMiddleware);

// What is a Restful API?
// Restful stands for Representational Stte Transfer.
// API stands for Application Programming Interface.
// A way to design your URL's to interact with the server.

// API's use HTTP methods to interact with ther server.
// GET - Get data
// POST - Send data
// PATCH - Update data
// PUT - Override data
// DELETE - Delete data

// Response contains an HTTP Status Code
// These are codes are used to represent the status of the response from server.
// 200 - Success/Ok
// 201 - Created
// 404 - Not Found
// 400 - Bad Request
// 500 - Internal Server Error

// URL stand for Uniform Resource Locator
// Resource is any type of data that we are storing on the server

// use a built in middleware to parse the body of the request into an object
app.use(
  express.urlencoded({
    extended: true, // parse nested objects within the request
  })
);

// Mock data in Memory (instead of getting data from a database)
const users = [
  { id: 1, username: "JohnDoe", email: "JohnDoe@gmail.com" },
  { id: 2, username: "JaneDoe", email: "JaneDoe@gmail.com" },
  { id: 3, username: "JamesDoe", email: "JamesDoe@gmail.com" },
];

// Get all users
// localhost:3000/users
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

// Get a single user
// localhost:3000/users/1
app.get("/users/:id", (req, res) => {
  // We can grab id from url query parameters
  var id = parseInt(req.params.id); //convert string to integer
  // find the user with id, the result will be an object or undefined
  var user = users.find((u) => {
    return u.id === id;
  });

  // if user not found return 404
  if (!user) {
    res.status(404).send({ message: "User not found." });
  }

  res.send(user);
});

// Post to create a user
// localhost:3000/users
app.post("/users", (req, res) => {
  var newUser = {
    id: users.length + 1,
    username: req.body.username,
    email: req.body.email,
  };

  // update mock database/array with new user
  users.push(newUser);

  res.status(200).send(newUser);
});

// Patch to update a user
// localhost:3000/users/1
app.patch("/users/:id", (req, res) => {
  // We can grab id from url query parameters
  var id = parseInt(req.params.id); //convert string to integer
  // find the user with id, the result will be an object or undefined
  var user = users.find((u) => {
    return u.id === id;
  });

  // if user not found return 404
  if (!user) {
    res.status(404).send({ message: "User not found." });
  }
  // update the user that is found
  user.username = req.body.username;
  user.email = req.body.email;

  res.send(user);
});

// Put to override user object
// localhost:3000/users/1
app.put("/users/:id", (req, res) => {
  // We can grab id from url query parameters
  var id = parseInt(req.params.id); //convert string to integer
  // find the user with id, the result will be an object or undefined
  var user = users.find((u) => {
    return u.id === id;
  });

  // if user not found return 404
  if (!user) {
    res.status(404).send({ message: "User not found." });
  }
  // override the user that is found
  user.id = req.body.id;
  user.username = req.body.username;
  user.email = req.body.email;

  res.send(user);
});

// Delete a user
// localhost:3000/users/1
app.delete("/users/:id", (req, res) => {
  // We can grab id from url query parameters
  var id = parseInt(req.params.id); //convert string to integer
  // find the user with id, the result will be an object or undefined
  var user = users.find((u) => {
    return u.id === id;
  });

  // if user not found return 404
  if (!user) {
    res.status(404).send({ message: "User not found." });
  }
  // find the index of user
  var indexOfUser = users.indexOf(user);
  // delete the user
  users.splice(indexOfUser, 1);
  // return the deleted record to update the client
  res.send(user);
});

// localhost:3000 OR 127.0.0.1:3000 both reference the current server
app.listen(3000);
