require('dotenv').config();
//dependency imports
const express = require('express');
const mongoose = require('mongoose');
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

//connect to DB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    }catch(err) {
        throw err;
    }
};

//Watches for DB connection changes
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

//listen for requests
app.listen(process.env.PORT, () => {
    connect();
    console.log('Server listening on port', process.env.PORT);
});