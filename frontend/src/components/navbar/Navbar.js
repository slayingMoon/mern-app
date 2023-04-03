import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user 
          ? <div>
              <span>Welcome, {user.email}</span>
              <button className="logout-btn" onClick={handleClick}>Logout</button>
            </div> 
          : 
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;