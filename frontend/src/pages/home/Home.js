import { useEffect } from 'react';
import Workout from '../../components/workout/Workout';
import WorkoutForm from '../../components/workoutForm/WorkoutForm';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import './Home.css'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts'); //not declaring the port number e.g localhost:4000, as we're using a proxy
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json});
            }
        };

        fetchWorkouts();
    }, [dispatch]); //resolve warning 'Reach Hook useEffect has a missing dependency'

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <Workout key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
;}

export default Home;
