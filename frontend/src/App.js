import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
//pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import WorkoutDetails from './components/workoutDetails/WorkoutDetails';
import WorkoutEdit from './components/workoutEdit/WorkoutEdit';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/workouts/:workoutId" 
              element={<WorkoutDetails />}
            />
            <Route 
              path="/workouts/edit/:workoutId" 
              element={<WorkoutEdit />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
