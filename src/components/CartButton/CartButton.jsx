import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  removeFromCart,
  changeQuantity,
} from "../../actions/cartActions";

export default function CartButton(props) {
  const cartItems = useSelector((state) => state.cart).cart;
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  if (!loggedIn) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          toast.warning("Log in to add item in the cart");
          setTimeout(() => {
            dispatch({ type: "OPEN_SIGNUP_MODAL" });
          }, 400);
        }}
        style={{ margin: "0px auto" }}
      >
        Add
      </Button>
    );
  }

  const cartItemsIds = [];
  cartItems.forEach((item) => cartItemsIds.push(item.id));
  let included = false;
  if (cartItemsIds.includes(props.id)) included = true;
  for (let i = 0; i < cartItems.length; i = i + 1) {
    if (cartItems[i].id === props.id) var quantity = cartItems[i].quantity;
  }
  if (quantity === 0) {
    dispatch(removeFromCart({ id: props.id }));
  }

  function handleAdd() {
    dispatch(
      addToCart({
        id: props.id,
        img: props.img,
        price: props.price,
        title: props.title,
        quantity: 1,
      })
    );
  }
  function handleRemove() {
    dispatch(removeFromCart({ id: props.id }));
  }
  function onButtonClick() {
    if (included) handleRemove();
    else handleAdd();
  }
  function handleIncrement() {
    dispatch(changeQuantity("INCREASE", props.id));
  }
  function handleDecrement() {
    dispatch(changeQuantity("DECREASE", props.id));
  }
  return (
    <ButtonGroup style={{ margin: "0px auto" }}>
      {included ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleIncrement}
        >
          +
        </Button>
      ) : null}
      <Button
        onClick={onButtonClick}
        color={included ? "secondary" : "primary"}
        variant="contained"
        size="small"
      >
        {included ? "Remove" : "Add"}
      </Button>
      {included ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleDecrement}
        >
          -
        </Button>
      ) : null}
    </ButtonGroup>
  );
}
