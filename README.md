# Procurement-System (web app)

Full-Stack prototype designed as an alternative to CGI's Software Procurement System.

My project is meant to demonstrate my mastery of:
* HTML/CSS
* Javascript
* Node.js
* Express.js
* API requests format validation (using Joi)
* Browser's Fetch API (CRUD operations & RESTful)
* Browser's sessionStorage
* Form submission
* Events
* MongoDB

# Installation Guide

BACK-END:

Software: 

* Node.js
* MongoDB Compass
* mongod CLI tool

1. From terminal, run command: **mongod**

MongoDB server should be waiting for connections on default port 27017

2. From project root, run command: **npm i**

node_modules folder should be added to root without errors

3. From MongoDB Compass, establish a connection on mongodb://localhost:27017
4. From project root, run command: **node ./server/index.js**

On terminal, the following strings should appear:
Listening on port 3000...
MongoDB connection established successfully

-------------------------------------------------------------------

FRONT-END:

Software: VSCode (+ extension: Live-Server)

From VSCode, open project folder, click on "sign-in.html" file and hit "Go Live" button at the bottom left corner of the screen.

Development server should bootup on default browser.

From there, follow the User Guide section below.

# Features

- "Sign-in/Sign-Up" pages + logout option
- "Account Information" page
- "Home" page
- "Request item" page
- "My Requests" page
- "Notifications" page

# User Guide

The code provides login/sign-up pages for the users.

At sign-up, the user's account information is saved to the MongoDB database and login is automatic. Checking the supervisor box gives supervisor privileges to the user (explained further down).

Sign-in authenticates the user by comparing credentials to the ones in the DB.

Upon authentication, user information is saved in sessionStorage and the user is greeted by the Home Page.

From the left retractable panel, clicking "Request Item" opens the request form.

Submitting an item request sends the request to the DB. Note that quantity defaults to "1" if omitted. The request's status is always "Pending" when placed.

When a supervisor logs in, their "Notifications" button in the menu panel flashes red when a pending request is detected in the DB, signaling that supervisor input in needed for an employee's request.

From the supervisor's notifications page, the request can be approved or denied (update status in the DB) by filling the form accordingly.

When the employee signs back in, their "Notifications" button in the left menu will be flashing red, signaling that there has been an update to the status of their request.
