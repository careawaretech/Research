import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Navbar() {
  return (
    <nav 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
      }}
    >
      <Link to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ height: '40px', width: 'auto' }}
        />
      </Link>
    </nav>
  );
}
