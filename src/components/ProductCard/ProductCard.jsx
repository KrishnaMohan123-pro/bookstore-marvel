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

const useStyles = makeStyles({
  root: {
    width: "250px",
    margin: "5px auto",
    paddingBottom: "5%",
    backgroundImage: "linear-gradient(#9ad3bc,#fbf6f0)",
  },
  bullet: {
    display: "inline-block",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontFamily: "Goldman",
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
    <Card className={classes.root}>
      {/* <Link to={"/" + props.type + "/" + props.id}> */}
      <div
        onClick={() => {
          history.push({
            pathname: `/${props.type}/${props.id}`,
            search: `?source=${props.source}`,
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <CardContent>
          <img
            src={props.img}
            style={{ width: "200px", height: "200px", marginBottom: "5px" }}
            alt={
              props.title.length > 20
                ? props.title.slice(0, 20) + "..."
                : props.title
            }
          />

          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            <b>
              {props.title.length > 20
                ? props.title.slice(0, 20) + "..."
                : props.title}
            </b>
          </Typography>
          {props.type === _BOOK && (
            <Typography className={classes.title} color="textPrimary">
              <b> Price - ${props.price}</b>
            </Typography>
          )}
          {props.type === _SERIES && (
            <Typography className={classes.title} color="textPrimary">
              <b>Start Year - {props.startYear}</b>
              <br />
              <b>End Year - {props.endYear}</b>
            </Typography>
          )}
        </CardContent>
      </div>
      {/* </Link> */}
      <CardActions style={{ margin: "0px auto" }}>
        {enablePurcahse ? (
          <CartButton
            id={props.id}
            price={props.price}
            img={props.img}
            title={props.title}
          />
        ) : (
          <SaveItemsButton
            id={props.id}
            img={props.img}
            title={props.title}
            type={props.type}
          />
        )}
      </CardActions>
    </Card>
  );
}
