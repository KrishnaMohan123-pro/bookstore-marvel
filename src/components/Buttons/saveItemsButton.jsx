import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveItem, removeItem } from "../../actions/savedItemsActions";
import { toast } from "react-toastify";
import { _SERIES, _CHARACTER } from "../../utility/sources/itemTypes";

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
      variant="contained"
      className="mx-auto"
      style={{
        borderRadius: "0",
        backgroundColor: included ? "#d14031" : "#70af85",
        color: "white",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      {included ? "Remove" : "Save"}
    </Button>
  );
}
