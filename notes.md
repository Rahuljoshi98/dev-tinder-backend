# firt initialze npm in our project

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
