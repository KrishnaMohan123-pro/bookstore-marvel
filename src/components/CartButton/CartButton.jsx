import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "./styles.css";
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
        onClick={(e) => {
          e.stopPropagation();
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

  function handleAdd() {
    dispatch(
      addToCart({
        id: props.id,
        img: props.img,
        price: props.price,
        source: props.source,
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
    if (quantity === 1) {
      dispatch(removeFromCart({ id: props.id }));
    }
    dispatch(changeQuantity("DECREASE", props.id));
  }
  return (
    <ButtonGroup style={{ margin: "0px auto", borderRadius: "0" }}>
      {included ? (
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDecrement();
          }}
          style={{ borderRadius: "0", backgroundColor: "#f6f5f5" }}
        >
          {quantity === 1 ? (
            <DeleteOutlineIcon style={{ fontSize: "large" }} />
          ) : (
            "-"
          )}
        </Button>
      ) : null}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick();
        }}
        variant="contained"
        size="small"
        style={{
          borderRadius: "0",
          backgroundColor: included ? "grey" : "#70af85",
          color: "white",
          padding: "0.5rem 2.5rem",
        }}
        disabled={included}
      >
        {included ? (quantity ? quantity : "0") : "Add"}
      </Button>

      {included ? (
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleIncrement();
          }}
          style={{ borderRadius: "0", backgroundColor: "#f6f5f5" }}
        >
          +
        </Button>
      ) : null}
    </ButtonGroup>
  );
}
