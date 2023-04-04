import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext(); //calling dispatch by using its newly assigned name

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        //clearing the workouts context on user logout
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null});
    };

    return { logout };
};