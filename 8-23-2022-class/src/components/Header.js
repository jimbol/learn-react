import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header () {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div>
            <Link to="/" style={{ display: 'flex', flexDirection: 'row' }}>
              <Logo />
              <Typography variant="h5">My Journal</Typography>
            </Link>
        </div>
        <Link to="/about">
          <Typography variant="h5">About</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
