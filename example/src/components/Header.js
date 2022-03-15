import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../journal-logo.png';

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

// const Logo = () => {
//   return <img src={logo} alt="logo" />;
// }

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Title>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
          <Typography variant="h6">Quick Jot</Typography>
        </Title>
        <Link to="/about">
          <Typography variant="h6" style={{ color: 'white' }}>About</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};



export default Header;

