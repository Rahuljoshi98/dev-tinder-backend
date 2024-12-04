# first initialze npm in your project

# Creating the server :-

We will create a server in which we can listen the incoming request from outside i.e., from the client. We will use express js for creating our server (it is the framwork for the nodejs).

## using npm i express :-

It will initialize node module in our project in which we will get the code for express js

# Verson of a library

For e.g.:- we installed express in our application then the express with its version will be added in dependencies.

for expample:-
express: "^4.18.1"

- **(^)** this sign is called the caret sign if we use caret then our project will automatically upgrade to the newer version if there are some patch changes or the minor changes (4.x.x version) if we remove the sign then it will not upgraded

- **(~)** we can use (~) tilde sign it allow the upgrade only in patches e.g.:- "express": "~4.17.1"

  - Allowed versions: 4.17.1, 4.17.2, 4.17.3 etc.
  - Not allowed: 4.18.0, 5.0.0.

- **patch :-** the last digit of the version it have the smaller changes like bug fixes

- **minor :-** the second digit of the version it have the minor changes i.e., adding new feature in our application which will not break the application. The application is backward compatable

- **major :-** first digit of the version which may break the application

# package-lock.json Vs package.json

package.json does not tell the exact version of our application it may be updated but the package-lock.json give the exact version of our application.

# Put vs Patch

**Put :-**

- Replaces the entire resource with the data provided in the request.

- Typically used when you want to overwrite the resource completely.

**Patch :-**

- Partially updates a resource with the data provided in the request.

- Only the fields included in the request are updated, other fields remain unchanged.

# Getting data from query

Suppose the route is

```javascript
localhost:3000/home?user_id=111&user_name=rahul_joshi
```

and we want to access the user_id. We can access it using query :-

```javascript
app.get("/home", (req, res) => {
  console.log(req.query);
  res.send(`user id is ${req.query.user_id}`);
});
```

# Dynamic Routes

Suppose the route is

```javascript
localhost: 3000 / home / 111 / rahul_joshi;
```

We can access the data from params :-

```javascript
app.get("/home/:user_id/:user_name", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
```

## What is Middleware?

Middleware is a request handlers that allows to intercept and manipulate request and response before they reach to the route handler. Middlewares are basically used in authentication, logging, error handling etc. It is a callback function having three arguments req, res, next.

## Difference between app.use() and app.all()

Major difference between app.use and app.all is the route path. app.all take the exact path but the app.use take the prefix and handle the path accordingly.

```javascript
app.use("/home", (req, res) => {
  res.send("all");
});
```

it will take alll the path having prefix "/home" i.e., "/home/user" is the valid path in app.use

```javascript
app.all("/home", (req, res) => {
  res.send("all");
});
```

but in the case of app.all it will be valid route for only "/home" it will not triggered on "/home/user".

## Error Handling

- We can use try catch also for the error handling.

- **Wild Card Error Handling :-**

```javascript
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
```

- While adding the error route make sure take the four parameters in which first one is error, second is req, third is res, and fourth is next.

- While using the wild card error handling make sure it should be placed at the bottom.

# Nomenclature in mongodb

Suppose we have a database named as devTinder in our mongodb compass and inside the database we have a folder named as User. This folder is called collection and inside that collection we have data of the user which is known as the document.

- devTinder (databse)
  - User (Collection)
    - Json object (document)

# app.use(express.json())

It is important to add this middleware in our code. This middleware parses incoming JSON requests and makes the data available in req.body.

```javascript
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body;
});
```
