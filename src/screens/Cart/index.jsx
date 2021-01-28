import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import CartCard from "../../components/cartCard/cartCard";
import PayButton from "../../services/razorPay/frontend/index";
import { Container, Grid } from "@material-ui/core";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart).cart;
  const loggedIn = useSelector((state) => state.loggedIn);
  const savedItems = useSelector((state) => state.savedItems);
  console.log(savedItems);

  if (!loggedIn) {
    return (
      <div className="cart-body">
        <p style={{ fontFamily: "Goldman", fontSize: "2rem" }}>
          Please Login First
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-body">
        <p>Ooops.....No items in cart</p>
        <Link to="/popular">Lets go to the world of comics</Link>
      </div>
    );
  }

  let total = 0;
  for (let i = 0; i < cartItems.length; i = i + 1) {
    total = total + parseFloat(cartItems[i].price);
  }
  return (
    <div className="cart-body">
      <h1>Cart Items</h1>
      {cartItems.map((Item) => {
        return (
          <CartCard
            key={Item.id}
            id={Item.id}
            img={Item.img}
            price={Item.price}
            title={Item.title}
          />
        );
      })}
      <div className="container" style={{ fontSize: "1.25rem" }}>
        <p className="book book-number float-left">
          <span style={{ textDecoration: "underline" }}>Number of Books</span>:{" "}
          {cartItems.length}
        </p>
        <p className="book book-total float-right" name="total">
          <span style={{ textDecoration: "underline" }}>Total</span>: ${" "}
          {total.toFixed(2)}
        </p>
      </div>
      <PayButton />
      <Container>
        <Grid container direction="column">
          <h1>Saved Characters</h1>
          {savedItems.character.length === 0
            ? "No Saved Character"
            : savedItems.character.map((item) => {
                return (
                  <Grid
                    item
                    id={item.id}
                    style={{ marginTop: "1rem", border: "solid 0.15rem grey" }}
                  >
                    <Grid container style={{ padding: "1.5rem" }}>
                      <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Link to={`/${item.type}/${item.id}`}>
                          <img
                            src={item.img}
                            style={{ width: "10rem", height: "10rem" }}
                            alt={item.title}
                          />
                        </Link>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Link to={`/${item.type}/${item.id}`}>
                          <p style={{ fontSize: "1.25rem" }}>{item.title}</p>
                        </Link>
                      </Grid>
                      <Grid item lg={3} md={3} sm={12} xs={12}>
                        <SaveItemsButton
                          id={item.id}
                          img={item.img}
                          title={item.title}
                          type={item.type}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
        </Grid>
        <Grid container direction="column">
          <h1>Saved Series</h1>
          {savedItems.series.length === 0
            ? "No Series Saved"
            : savedItems.series.map((item) => {
                return (
                  <Grid
                    item
                    id={item.id}
                    style={{ marginTop: "1rem", border: "solid 0.15rem grey" }}
                  >
                    <Grid container style={{ padding: "1.5rem" }}>
                      <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Link to={`/${item.type}/${item.id}`}>
                          <img
                            src={item.img}
                            style={{ width: "10rem", height: "10rem" }}
                            alt={item.title}
                          />
                        </Link>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Link to={`/${item.type}/${item.id}`}>
                          <p style={{ fontSize: "1.25rem" }}>{item.title}</p>
                        </Link>
                      </Grid>
                      <Grid item lg={3} md={3} sm={12} xs={12}>
                        <SaveItemsButton
                          id={item.id}
                          img={item.img}
                          title={item.title}
                          type={item.type}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
        </Grid>
      </Container>
    </div>
  );
}
