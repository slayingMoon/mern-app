import './Workout.css';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

const Workout = ({workout}) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if(!user) {
            return;
        }
        
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: data});
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <div className="btns">
                <Link to={`/workouts/${workout._id}`}>
                <span className="material-symbols-outlined">info</span>
                </Link>
                {user && user._id === workout.user_id && <span className="material-symbols-outlined delete" onClick={handleClick}>delete</span>}
            </div>
        </div>
    )
};

export default Workout;