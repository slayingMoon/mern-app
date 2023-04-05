import { useParams } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './WorkoutDetails.css';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';

const WorkoutDetails = () => {
    const { workoutId } = useParams();
    const {workouts} = useWorkoutsContext();

    const workout = workouts.find(x => x._id === workoutId) || {};

    return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout?.createdAt), { addSuffix: true })}</p>
    </div>
    )
};

export default WorkoutDetails;