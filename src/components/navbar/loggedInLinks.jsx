import React, { Fragment } from "react";
import { Button, Badge } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import CartDialog from "../CartDialog/cartDialog";
export default function LoggedInLinks() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart).cart;
  let length = cartItems.length;
  const history = useHistory();
  return (
    <Fragment>
      <div className="cart-button-box">
        <Badge badgeContent={length === 0 ? "0" : length} color="primary">
          <Button
            color="inherit"
            variant="outlined"
            className="cart-button"
            style={{ position: "relative" }}
            onClick={() => {
              history.push("/cart");
            }}
          >
            <ShoppingCartIcon fontSize="small" />
            CART
          </Button>
        </Badge>
        <CartDialog />
      </div>
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
