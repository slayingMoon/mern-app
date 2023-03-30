const express = require('express');
const Workout = require('../models/Workout.js')

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'Get all workounts'});
});

//GET a single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'Get a single workout'});
});

//POST a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body;
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
});

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete a workout'});
});

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update a new workout'});
});

module.exports = router;