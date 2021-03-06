import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem } from "../../actions/savedItemsActions";
const useStyles = makeStyles({
  list: {
    maxWidth: 300,
    overflowY: "scroll",
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    width: "80%",
    maxWidth: 250,
  },
});
export default function SavedItemsDrawer(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  console.log(state);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      className={clsx(classes.list)}
    >
      <List>
        {props.items.length === 0 ? (
          <ListItem>
            <p style={{ width: 250, textAlign: "center" }}>
              No Saved {props.type}
            </p>
          </ListItem>
        ) : (
          props.items.map((item) => (
            <ListItem button key={item.id}>
              <Grid container style={{ width: 250 }}>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Link
                    to={{
                      pathname: `/${item.type}/${item.id}`,
                      search: `?source=${item.source}`,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ height: "4rem", width: "3rem" }}
                    />
                  </Link>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                  <Link
                    to={{
                      pathname: `/${item.type}/${item.id}`,
                      search: `?source=${item.source}`,
                    }}
                  >
                    <p style={{ fontSize: "0.7rem" }}>{item.title}</p>
                  </Link>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeItem(item.type, item));
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <div className="saved-items" onClick={toggleDrawer(true)}>
          {props.buttonName.toUpperCase()}
        </div>
        <Drawer
          anchor={"right"}
          open={state}
          onClose={toggleDrawer(false)}
          className={classes.drawer}
        >
          <h3
            style={{
              fontFamily: "Goldman",
              padding: "1.5rem 0",
              backgroundImage: "linear-gradient(30deg,#ffefa1,#94ebcd)",
            }}
          >
            SAVED ITEMS
          </h3>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
