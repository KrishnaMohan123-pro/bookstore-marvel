import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveItem, removeItem } from "../../actions/savedItemsActions";
import { toast } from "react-toastify";
import { _SERIES, _CHARACTER } from "../../utility/sources/itemTypes";
import "./styles.css";

export default function SaveItemsButton(props) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems);
  const loggedIn = useSelector((state) => state.loggedIn);
  const itemsId = [];
  switch (props.type) {
    case _SERIES:
      savedItems.series.forEach((item) => itemsId.push(item.id));
      break;
    case _CHARACTER:
      savedItems.character.forEach((item) => itemsId.push(item.id));
      break;
    default:
      console.log("default");
  }
  const included = itemsId.includes(props.id);
  function handleClick(e) {
    e.stopPropagation();
    if (!loggedIn) {
      toast.error("Please Signup!!");
    } else {
      if (included) {
        dispatch(removeItem(props.type, props));
      } else {
        dispatch(saveItem(props.type, props));
      }
    }
  }
  return (
    <Button
      size="small"
      onClick={(e) => {
        handleClick(e);
      }}
      className="save-items-button"
      variant="contained"
      style={{
        borderRadius: "0",
        backgroundColor: included ? "#d14031" : "#ffce76",
        boxShadow: "0 0 0.25rem grey",
        color: included ? "#f0ece2" : "#1d1919",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      {included ? "Remove" : "Save"}
    </Button>
  );
}
