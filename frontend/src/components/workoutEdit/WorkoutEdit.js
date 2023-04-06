import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './WorkoutEdit.css';
import { useNavigate, useParams } from 'react-router-dom';

const WorkoutEdit = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const { workoutId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(`/api/workouts/${workoutId}`, {
            method: 'GET'
            });

            const result = await response.json();

            changeValues(result);
        };
        
        fetchWorkout();
    }, [workoutId]);

    const changeValues = (data) => {
        console.log(data);
        setTitle(data.title);
        setLoad(data.load);
        setReps(data.reps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user) {
            setError('You must be logged in');
            return;
        }

        const workout = {
            title,
            load,
            reps
        };

        const response = await fetch(`/api/workouts/${workoutId}`, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
            setEmptyFields(data.emptyFields);
        }

        if(response.ok) {
            console.log('workout updated', data);
            //refreshes the local context of workouts and re-renders the updated collection
            dispatch({type: 'EDIT_WORKOUT', payload: data});
            navigate(`/workouts/edit/${workoutId}`);
        }

    };

    return (
        <form className="edit" onSubmit={handleSubmit}>
            <h3>Edit Workout</h3>

            <label>Excercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Edit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default WorkoutEdit;