import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchBar from "../SearchBar/searchBar";
import { Avatar } from "@material-ui/core";
import SideDrawer from "../SideDrawer/sideDrawer";
import LoggedInLinks from "./loggedInLinks";
import "./styles.css";
import LoggedOutLinks from "./loggedOutLinks";

export default function Navbar() {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.loggedIn);
  const userName = useSelector((state) => state.auth.user.fname);
  const userImage = useSelector((state) => state.auth.user.photoURL);

  return (
    <AppBar className="app-bar" position="sticky" elevation={0}>
      <Toolbar>
        <SideDrawer />
        <Link to="/" style={{ color: "inherit" }}>
          <Typography variant="h6">Marvel</Typography>
        </Link>
        <div className="app-bar-links">
          <SearchBar />
        </div>
        {loggedIn ? (
          <div className="ml-auto">
            <Button
              color="inherit"
              variant="text"
              onClick={() => {
                history.push("/account");
              }}
            >
              <Avatar alt={userName} src={userImage} />
            </Button>
          </div>
        ) : null}
        <div
          className="app-bar-links"
          style={loggedIn ? {} : { marginLeft: "auto" }}
        >
          {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
        </div>
      </Toolbar>
    </AppBar>
  );
}
