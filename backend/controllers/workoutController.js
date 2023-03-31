const Workout = require('../models/Workout.js');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    //Handles internal server error in case of invalid mongoDB id (e.g. 2223)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findById(id);

    if(!workout) {
        //we need to return here, to stop the rest of the code from executing
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    //add document to db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

// delete a workout

//update a workout

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout
}