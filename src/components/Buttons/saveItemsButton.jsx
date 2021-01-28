import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveItem, removeItem } from "../../actions/savedItemsActions";

export default function SaveItemsButton(props) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems);
  const itemsId = [];
  switch (props.type) {
    case "series":
      savedItems.series.forEach((item) => itemsId.push(item.id));
      break;
    case "character":
      savedItems.character.forEach((item) => itemsId.push(item.id));
      break;
    default:
      console.log("default");
  }
  const included = itemsId.includes(props.id);
  function handleClick(e) {
    if (included) {
      dispatch(removeItem(props.type, props));
    } else {
      dispatch(saveItem(props.type, props));
    }
  }
  return (
    <Button
      onClick={(e) => {
        handleClick(e);
      }}
      variant="contained"
      color={included ? "secondary" : "primary"}
      className="mx-auto"
    >
      {included ? "Remove" : "Save"}
    </Button>
  );
}
