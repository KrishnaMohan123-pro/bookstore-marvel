import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CartButton from "../CartButton/CartButton";
import SaveItemsButton from "../Buttons/saveItemsButton";
import { useHistory } from "react-router-dom";
import { _BOOK, _SERIES } from "../../utility/sources/itemTypes";
import { addToCart } from "../../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./styles.css";

const useStyles = makeStyles({
  root: {
    width: "200px",
    borderRadius: "0%",
    boxShadow: "none",
    position: "relative",
    backgroundColor: "transparent",
  },
  bullet: {
    display: "inline-block",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function ProductCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart).cart;
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  let enablePurchase = false;
  const cartItemsIds = [];
  cartItems.forEach((item) => cartItemsIds.push(item.id));
  let included = false;
  if (cartItemsIds.includes(props.id)) included = true;

  if (props.type === _BOOK) enablePurchase = true;
  return (
    <Card className={classes.root + " product-card"}>
      <div
        onClick={() => {
          history.push({
            pathname: `/${props.type}/${props.id}`,
            search: `?source=${props.source}`,
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <CardContent style={{ padding: "0 0 2rem 0" }}>
          <div
            className="card-ribbon cart-added"
            style={{ display: included ? "block" : "none" }}
          >
            ADDED
          </div>
          <div className="card-ribbon book-type">
            {props.type.toUpperCase()}
          </div>
          {window.innerWidth > 1000 ? (
            <div className="hover-image-cover">
              <p
                className="hover-image-cover-text"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!loggedIn) {
                    toast.warning("Log in to add item in the cart");
                    setTimeout(() => {
                      dispatch({ type: "OPEN_SIGNUP_MODAL" });
                    }, 400);
                  } else {
                    if (enablePurchase) {
                      if (included) {
                        history.push(`/cart`);
                      } else {
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
                    } else {
                      history.push({
                        pathname: `/${props.type}/${props.id}`,
                        search: `?source=${props.source}`,
                      });
                    }
                  }
                }}
              >
                {enablePurchase
                  ? included
                    ? "VIEW IN CART"
                    : "ADD TO CART"
                  : "CLICK TO VIEW"}
              </p>
            </div>
          ) : null}

          <div className="product-image-box">
            <img
              className="product-image"
              src={props.img}
              alt={
                props.title.length > 35
                  ? props.title.slice(0, 35) + "..."
                  : props.title
              }
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              <b>
                {props.title.length > 23
                  ? props.title.slice(0, 23) + "..."
                  : props.title}
              </b>
            </Typography>
            {props.type === _BOOK && (
              <Typography className={classes.title} color="textPrimary">
                Price - ${props.price}
              </Typography>
            )}
            {props.type === _SERIES && (
              <Typography color="textPrimary">
                Start Year - {props.startYear}
                <br />
                End Year - {props.endYear}
              </Typography>
            )}
          </div>
        </CardContent>
        {window.innerWidth > 1000 ? null : (
          <CardActions style={{ marginTop: "-1.7rem" }}>
            {enablePurchase ? (
              <CartButton
                id={props.id}
                img={props.img}
                price={props.price}
                title={props.title}
                source={props.source}
              />
            ) : (
              <SaveItemsButton
                id={props.id}
                img={props.image}
                title={props.title}
                type={props.type}
                source={props.source}
              />
            )}
          </CardActions>
        )}
      </div>
    </Card>
  );
}
