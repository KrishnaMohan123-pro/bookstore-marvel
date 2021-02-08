import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import CartLink from "./cartLink";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
export default function LoggedInLinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Fragment>
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
    </Fragment>
  );
}
