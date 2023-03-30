require('dotenv').config();

const express = require('express');

//creates express app
const app = express();

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//set routes to handle requests/responses
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the app.'});
});

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});