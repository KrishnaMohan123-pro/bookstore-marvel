import React, { Fragment } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, IconButton, Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link, useHistory } from "react-router-dom";
import { removeFromCart } from "../../actions/cartActions";
export default function CartDialog() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart).cart;
  let total = 0;
  for (let i = 0; i < cartItems.length; i = i + 1) {
    total = total + cartItems[i].quantity * parseFloat(cartItems[i].price);
  }
  if (cartItems.length === 0) {
    return (
      <div className="cart-dialog">
        <p style={{ paddingTop: "1rem" }}>No products in the cart</p>
      </div>
    );
  }
  return (
    <div className="cart-dialog">
      <Grid container direction="column">
        {cartItems.map((item) => {
          return (
            <Fragment key={item.id}>
              <Grid item style={{ padding: "1rem 0.5rem 0.5rem" }}>
                <Grid container>
                  <Grid item xl={3} lg={3} md={3}>
                    <Link
                      to={{
                        pathname: `/book/${item.id}`,
                        search: `?source=${item.source}`,
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ height: "5rem", width: "4rem" }}
                      />
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    style={{
                      textAlign: "left",
                      padding: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/book/${item.id}`,
                        search: `?source=${item.source}`,
                      }}
                    >
                      <p>{item.title}</p>
                    </Link>
                    <p>
                      {item.quantity} X ${item.price}
                    </p>
                  </Grid>
                  <Grid item xl={3} lg={3} md={3}>
                    <IconButton
                      onClick={() => {
                        dispatch(removeFromCart({ id: item.id }));
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Divider style={{ width: "80%", margin: "0.1rem auto 0" }} />
            </Fragment>
          );
        })}
        <Grid item>
          <Grid container style={{ fontSize: "1rem" }}>
            <Grid item xl={6} lg={6} md={6}>
              <p>Total :</p>
            </Grid>
            <Grid item xl={6} lg={6} md={6}>
              <p>$ {total.toFixed(2)}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "1rem" }}>
          <Button
            color="inherit"
            variant="outlined"
            className="cart-button"
            style={{ position: "relative", width: "8rem" }}
            onClick={() => {
              history.push("/cart");
            }}
          >
            View Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
