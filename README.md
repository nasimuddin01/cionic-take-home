# Cionic Take Home Project

This is a simple project to demonstrate responsive design, custom form input, and a simple api integration.

## Live Demo

[https://https://cionic.onrender.com](https://cionic.onrender.com)

Go to the live demo to see the project in action. Input all the required fields and click `Add to Cart` button to see
the results. I made the backend api to return a random status of either `200` or `404`. If `API` returns `200` then the
app show a success message and if it returns `404` then it shows an error message. To see both the messages, you can
click the `Add to Cart` button multiple times.

## Challenges

The key challenge on this project was building custom form input that is accessible and responsive. I had to build the
inputs in a way that works with or without style. Also input validation will work even without javascript.

## Tech Stack

JavaScript, Vue.js, Scss(Sass), HTML, Node.js & Express

## Project setup

For local development, you need to have Node.js installed on your machine. Clone this repo on your local machine & then
run the following commands:

```
cd frontend
yarn
yarn serve
```

This will start the frontend server on `localhost:8080`. To start the backend server, run the following commands:

```
cd backend
yarn
yarn dev
```
