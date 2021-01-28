import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveItem } from "../../actions/savedItemsActions";

export default function SaveItemsButton(props) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems);
  function handleSave(e) {
    dispatch(saveItem(props.type, props));
    console.log(savedItems);
  }
  return (
    <Button
      onClick={(e) => {
        handleSave(e);
      }}
      variant="contained"
      color="primary"
      className="mx-auto"
    >
      Save
    </Button>
  );
}
