import { useState } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import './WorkoutForm.css';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {
            title,
            load,
            reps
        };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
        }

        if(response.ok) {
            //Reset form after receiving an ok response from api
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
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
            />

            <label>Load (kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default WorkoutForm;