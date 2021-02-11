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
import "./styles.css";

const useStyles = makeStyles({
  root: {
    height: "325px",
    width: "250px",
    borderRadius: "5%",
    margin: "5px auto",
    paddingBottom: "5%",
    backgroundImage: "linear-gradient(#ffd66b,#fcfefe)",
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
  let enablePurcahse = false;

  if (props.type === _BOOK) enablePurcahse = true;
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
        <CardContent style={{ padding: 0 }}>
          <img
            src={props.img}
            style={{ width: "250px", height: "200px", marginBottom: "5px" }}
            alt={
              props.title.length > 35
                ? props.title.slice(0, 35) + "..."
                : props.title
            }
          />
          <div style={{ alignSelf: "center" }}>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
              style={{ verticalAlign: "centre" }}
            >
              <b>
                {props.title.length > 25
                  ? props.title.slice(0, 25) + "..."
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
      </div>
      <CardActions className="card-actions">
        {enablePurcahse ? (
          <CartButton
            id={props.id}
            price={props.price}
            img={props.img}
            title={props.title}
            source={props.source}
          />
        ) : (
          <SaveItemsButton
            id={props.id}
            img={props.img}
            title={props.title}
            type={props.type}
            source={props.source}
          />
        )}
      </CardActions>
    </Card>
  );
}
