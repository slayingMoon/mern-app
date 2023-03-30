require('dotenv').config();
//dependency imports
const express = require('express');
const workoutRoutes = require('./routes/workouts.js');

//creates express app
const app = express();

//middleware
app.use(express.json()); //required in order to have access to the request body

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes to handle requests/responses
app.use('/api/workouts', workoutRoutes);

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});