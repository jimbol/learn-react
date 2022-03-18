import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import journalLogo from '../journal-logo.png';

const Logo = styled.img`
  padding: 12px;
  width: 45px;
  height: auto;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Title>
            <Logo src={journalLogo} alt="logo" />
            <Typography variant="h6" style={{ color: 'white' }}>Quick Jot</Typography>
          </Title>
        </Link>
        <Link to="/about">
          <Typography variant="h6" style={{ color: 'white' }}>About</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
