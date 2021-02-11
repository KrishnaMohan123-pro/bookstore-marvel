import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import SearchBar from "../SearchBar/searchBar";
import { useSelector } from "react-redux";
import "./styles.css";
import LoggedOutLinks from "../navbar/loggedOutLinks";
import LoggedInLinks from "../navbar/loggedInLinks";

export default function SideDrawer() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="side-drawer">
      <div className="side-drawer-button">
        <IconButton
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          <MenuIcon color="secondary" fontSize="large" />
        </IconButton>
      </div>
      {showOptions ? (
        <div
          className="side-drawer-options"
          onBlur={() => {
            setShowOptions(false);
          }}
        >
          <div className="side-drawer-searchbar">
            <SearchBar />
          </div>

          <div className="side-drawer-links">
            {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
          </div>
        </div>
      ) : null}
    </div>
  );
}
