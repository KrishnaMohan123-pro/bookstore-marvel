import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "0 auto",
    borderRadius: "5%",
    backgroundImage: "linear-gradient(#eaffd0,#fce38a)",
  },
});

export default function NavigationCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={{ pathname: props.navigateTo, search: props.search }}>
        <CardActionArea>
          <div>{props.icon}</div>
          <CardContent>
            <Typography gutterBottom variant="h7" component="h7">
              {props.cardTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
