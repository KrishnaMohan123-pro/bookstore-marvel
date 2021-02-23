import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import { Container, Grid, Divider } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CartCard from "../../components/cartCard/cartCard";
import PayButton from "../../services/razorPay/frontend/index";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart).cart;
  const loggedIn = useSelector((state) => state.loggedIn);

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
      <div
        className="cart-body"
        style={{
          backgroundImage: "linear-gradient(#c7ffd8, #f9f871, #c7ffd8)",
          padding: "5rem 0",
        }}
      >
        <p style={{ fontSize: "4rem", fontFamily: "Goldman" }}>
          It seems your cart is empty
        </p>
        <Link to="/popular">Lets go to the world of comics</Link>
      </div>
    );
  }
  let total = 0;
  for (let i = 0; i < cartItems.length; i = i + 1) {
    total = total + cartItems[i].quantity * parseFloat(cartItems[i].price);
  }
  return (
    <main className="cart-body">
      <section id="cart-body-heading">
        <LocalMallIcon style={{ fontSize: "5rem" }} />
        <h1 style={{ fontSize: "4rem", fontFamily: "Dancing Script" }}>
          YOUR SHOPPING BAG
        </h1>
      </section>
      <section id="cart-item-table-headers">
        <Container>
          <Grid container>
            {window.innerWidth < 500 ? null : (
              <Grid item xl={1} lg={1} md={1} sm={7} xs={1}></Grid>
            )}

            <Grid item xl={5} lg={5} md={5} sm={7} xs={5}>
              Product
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={4}>
              Price
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
              Total
            </Grid>
          </Grid>
          <Divider />
        </Container>
      </section>
      <section>
        {cartItems.map((Item) => {
          return (
            <CartCard
              key={Item.id}
              id={Item.id}
              img={Item.img}
              price={Item.price}
              title={Item.title}
              source={Item.source}
            />
          );
        })}
      </section>
      <section id="cart-items-total">
        <Container className="cart-items-total-container">
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <p
                style={{
                  margin: "0 auto",
                  fontFamily: "Bebas Neue",
                  fontSize: "1.5rem",
                }}
              >
                Total Amount: $ {total.toFixed(2)}
              </p>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className="pay-button-box">
                <PayButton />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </main>
  );
}
