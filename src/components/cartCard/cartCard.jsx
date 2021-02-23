import React from "react";
import CartButton from "../CartButton/CartButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { removeFromCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";
import "./styles.css";

export default function CartCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart).cart;
  let quantity = 0;
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].id === props.id) {
      quantity = cart[i].quantity;
    }
  }
  return (
    <Container className="cart-item">
      <Grid container className="cart-item-container">
        {window.innerWidth < 500 ? null : (
          <Grid item xl={1} lg={1} md={1} sm={1}>
            <IconButton
              className="cart-remove-icon-button"
              disableRipple
              onClick={() => {
                dispatch(removeFromCart({ id: props.id }));
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Grid>
        )}

        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={0}
          className="cart-item-image-box"
        >
          <img
            className="cart-item-image"
            src={props.img}
            alt={props.title}
            onClick={() => {
              history.push({
                pathname: `/book/${props.id}`,
                search: `?source=${props.source}`,
              });
            }}
            style={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid
          item
          xl={3}
          lg={3}
          md={3}
          sm={5}
          xs={5}
          className="cart-item-title-box item-title "
        >
          <p
            onClick={() => {
              history.push({
                pathname: `/book/${props.id}`,
                search: `?source=${props.source}`,
              });
            }}
            style={{ cursor: "pointer" }}
          >
            {props.title}
          </p>
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={4}
          className="cart-item-price-box"
        >
          <p>{"$ " + props.price}</p>
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={3}
          className="cart-item-total-box"
        >
          <p>{`$ ${quantity * props.price}`}</p>
        </Grid>
        {window.innerWidth > 499 ? null : (
          <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
            <Button
              className="cart-remove-icon-button"
              disableRipple
              onClick={() => {
                dispatch(removeFromCart({ id: props.id }));
              }}
            >
              Remove
            </Button>
          </Grid>
        )}
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={12}
          xs={12}
          className="cart-item-action-box item-price"
        >
          <div>
            <CartButton
              id={props.id}
              price={props.price}
              img={props.img}
              title={props.title}
              source={props.source}
            />
          </div>
        </Grid>
      </Grid>

      <Divider style={{ marginTop: "1rem" }} />
    </Container>
  );
}
