import { useState } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './WorkoutForm.css';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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

        const response = await fetch('/api/workouts', {
            method: 'POST',
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
            //Reset form after receiving an ok response from api
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('new workout added', data);
            //refreshes the local context of workouts and re-renders the updated collection
            dispatch({type: 'CREATE_WORKOUT', payload: data});
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

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

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default WorkoutForm;