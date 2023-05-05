import { Button } from '@mui/material';
import logo from '../journal-logo.png';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <code>Quick Jot</code>
      </p>
      <Button onClick={() => navigate('/about')}>About</Button>
    </header>
  );
}

export default AppHeader;
