import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
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
        <Title>
          <Logo src={journalLogo} alt="logo" />
          <Typography variant="h6">Quick Jot</Typography>
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
