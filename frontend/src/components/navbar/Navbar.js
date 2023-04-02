import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? <div>Welcome, {user.email}</div> : 
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