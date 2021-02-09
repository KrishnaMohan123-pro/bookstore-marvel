import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import SearchBar from "../SearchBar/searchBar";

import SideDrawer from "../SideDrawer/sideDrawer";
import LoggedInLinks from "./loggedInLinks";
import "./styles.css";
import LoggedOutLinks from "./loggedOutLinks";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

export default function Navbar() {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.loggedIn);
  // const userName = useSelector((state) => state.auth.user.fname);
  // const userImage = useSelector((state) => state.auth.user.photoURL);

  return (
    <AppBar className="app-bar" position="sticky" elevation={0}>
      <Toolbar className="tool-bar">
        <SideDrawer />
        <Link to="/" style={{ color: "inherit", marginRight: "1.5rem" }}>
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
              Account
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
