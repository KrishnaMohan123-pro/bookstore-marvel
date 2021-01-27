import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Button,
  ButtonGroup,
  // List,
  // ListItem,
  // Divider,
} from "@material-ui/core";
import SearchBar from "../SearchBar/searchBar";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartLink from "../navbar/cartLink";
import "./styles.css";
import { logout } from "../../actions/authActions";

export default function SideDrawer() {
  // const list = () => {
  //   <div>
  //     <List>
  //       <ListItem>
  //         <Button
  //           color="inherit"
  //           variant="text"
  //           onClick={() => {
  //             history.push("/account");
  //           }}
  //         >
  //           Account
  //         </Button>
  //       </ListItem>
  //       <Divider />
  //       <ListItem>
  //         <Button
  //           color="inherit"
  //           variant="text"
  //           style={{ position: "relative" }}
  //           onClick={() => {
  //             history.push("/cart");
  //           }}
  //         >
  //           <CartLink />
  //         </Button>
  //       </ListItem>
  //       <Divider />
  //       <ListItem>
  //         <Button
  //           color="inherit"
  //           variant="text"
  //           onClick={() => {
  //             dispatch({ type: "LOGGED_OUT" });
  //             dispatch(logout());
  //             history.push("/");
  //           }}
  //         >
  //           SIGNOUT
  //         </Button>
  //       </ListItem>
  //       <Divider />
  //     </List>
  //   </div>;
  // };
  const dispatch = useDispatch();
  const history = useHistory();
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
          <SearchBar />
          <ButtonGroup orientation="vertical" className="mt-2">
            <Button
              color="inherit"
              variant="text"
              style={{ position: "relative" }}
              onClick={() => {
                history.push("/cart");
              }}
            >
              <CartLink />
            </Button>
            <Button
              color="inherit"
              variant="text"
              onClick={() => {
                dispatch({ type: "LOGGED_OUT" });
                dispatch(logout());
                history.push("/");
              }}
            >
              SIGNOUT
            </Button>
          </ButtonGroup>
        </div>
      ) : null}
    </div>
  );
}
