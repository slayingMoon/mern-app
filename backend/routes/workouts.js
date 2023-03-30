const express = require('express');

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
router.post('/', (req, res) => {
    res.json({msg: 'Post a new workout'});
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