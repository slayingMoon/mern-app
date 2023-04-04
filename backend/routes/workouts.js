const express = require('express');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController.js');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all workout routes
// router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', requireAuth, createWorkout); //require authorization only for chosen paths

//DELETE a workout
router.delete('/:id', requireAuth, deleteWorkout);

//UPDATE a workout
router.patch('/:id', requireAuth, updateWorkout);

module.exports = router;