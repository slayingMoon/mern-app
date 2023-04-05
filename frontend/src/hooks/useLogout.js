import { redirect } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    //const { dispatch: workoutsDispatch } = useWorkoutsContext(); //calling dispatch by using its newly assigned name

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        //clearing the workouts context on user logout(not needed when everyone, even logged out users can see workouts)
        // workoutsDispatch({type: 'SET_WORKOUTS', payload: null});
        redirect('/');
    };

    return { logout };
};