import React from "react";
import CartButton from "../CartButton/CartButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CartCard(props) {
  const history = useHistory();
  const cart = useSelector((state) => state.cart).cart;
  let quantity = 0;
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].id === props.id) {
      quantity = cart[i].quantity;
    }
  }
  return (
    <div className="container">
      <div className="cart-item row">
        <div className="book col-md-4">
          <img
            className="book-image"
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
        </div>
        <div className="book cart-title col-md-5 align-self-center">
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
        </div>
        <div className="book cart-price col-md-3">
          <p>{"$ " + props.price}</p>
          <p>{`Quantity : ${quantity}`}</p>
          <div>
            <CartButton
              id={props.id}
              price={props.price}
              img={props.img}
              title={props.title}
              source={props.source}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
