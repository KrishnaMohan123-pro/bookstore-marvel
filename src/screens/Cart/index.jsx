import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { Link } from "react-router-dom";
import { Container, Grid, Divider } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ClearIcon from "@material-ui/icons/Clear";
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
  console.log(cartItems);
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
            <Grid item xl={5} lg={5} md={5} sm={7} xs={5}>
              Product
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
              Price
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Quantity
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
        <h1 className="cart-items-total-heading">Total Payable Amount</h1>
        <Container className="cart-items-total-container">
          <Grid container>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <Grid container>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
                  Price
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={4}>
                  Quantity
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
                  Total
                </Grid>
              </Grid>
              <Divider className="total-grid-divider" />
              <Grid container direction="column">
                {cartItems.map((item) => {
                  return (
                    <Grid item key={item.id}>
                      <Grid container>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
                          {item.price}
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                          <ClearIcon />
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={4}>
                          {item.quantity}
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                          =
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
                          {item.price * item.quantity}
                        </Grid>
                      </Grid>
                      <Divider className="total-grid-divider" />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={8}>
                  <p style={{ fontFamily: "Dancing Script" }}>Total Amount</p>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  =
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={3}>
                  {total.toFixed(2)}
                </Grid>
              </Grid>
              <Divider className="total-grid-divider" />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className="pay-button">
                <PayButton />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </main>
  );
}
