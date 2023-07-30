# Chartie - Circunetics-Research
## Overview
The Real-Time D3.js Visualization with User Authentication project aims to combine the power of the MERN stack with D3.js, enabling users to interact with visualizations in real-time while maintaining the security and privacy of their data through user authentication.

## Tech Stack :

### A) Frontend :

React (JS Syntax), Prime React Library and CSS for Styling, fetch for handling asynchrous request, react-router-dom for routing or Navigate from one page to another, Standard react components, React-hooks, primereact-icons, d3.js bar chart, token-based-authentication. Redux Toolkit for state management.

### B) Backend :

Node.js, Express.js, mongodb (NoSQL), mongoose for connect database to server, cors for handling the cors error.

## Some instructions to run locally :

### Installation
Clone the Repository from Github or download zip file. Then do the following steps:
```bash
# For Frontend

    npm install

// To run react-app
    npm run start
    (Or)
    npm start


# For Backend
// make a .env file and write these
// PORT = Your favourite port number
// MONGO_URI = Mongodb database url
// JWT_SECRET_KEY= Your Secret key

    npm install
    npm run start-dev

## Some HTTP (Hyper Text Transfer Protocol) Status Code Which I used :

500 ---> Failure

404 ---> Details Not Found

401 ---> Wrong Details

200 ---> OK/Success

```
## Frontend Deployed Links:
https://chartie.pages.dev/ (Cloudflare Pages)
##
https://custom-app-75181.web.app/ (Firebase)

## Backend Render Deployed Link:
Server Deploy link : https://chartie.onrender.com/