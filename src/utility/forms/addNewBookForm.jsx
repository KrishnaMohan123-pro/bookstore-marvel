import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addNewBook } from "../../actions/newBookAdditionActions";

export default function AddNewBookForm() {
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({
    description: "",
    id: "",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    publishedOn: "",
    price: 0,
    title: "",
  });
  console.log(newBook);
  function handleChange(e) {
    const value = e.target.value;
    const id = e.target.id;
    setNewBook((prevValue) => {
      switch (id) {
        case "title":
          return {
            description: prevValue.description,
            id: prevValue.id,
            image: prevValue.image,
            publishedOn: prevValue.publishedOn,
            price: prevValue.price,
            title: value,
          };
        case "description":
          return {
            description: value,
            id: prevValue.id,
            image: prevValue.image,
            publishedOn: prevValue.publishedOn,
            price: prevValue.price,
            title: prevValue.title,
          };
        case "id":
          return {
            description: prevValue.description,
            id: value,
            image: prevValue.image,
            publishedOn: prevValue.publishedOn,
            price: prevValue.price,
            title: prevValue.title,
          };
        case "image":
          return {
            description: prevValue.description,
            id: prevValue.id,
            image: value,
            publishedOn: prevValue.publishedOn,
            price: prevValue.price,
            title: prevValue.title,
          };
        case "publishedOn":
          return {
            description: prevValue.description,
            id: prevValue.id,
            image: prevValue.image,
            publishedOn: value,
            price: prevValue.price,
            title: prevValue.title,
          };
        case "price":
          return {
            description: prevValue.description,
            id: prevValue.id,
            image: prevValue.image,
            publishedOn: prevValue.publishedOn,
            price: value,
            title: prevValue.title,
          };
        default:
          return prevValue;
      }
    });
  }
  function handleNewBookAddition(e) {
    e.preventDefault();
    dispatch(addNewBook(newBook));
    dispatch({ type: "CLOSE_DIALOG" });
  }
  return (
    <form onSubmit={(e) => handleNewBookAddition(e)}>
      <TextField
        className="mt-2"
        color="primary"
        id="title"
        label="Title"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="price"
        label="Price"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="number"
        inputProps={{ step: 0.01, min: 0 }}
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="description"
        label="Description"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
      />
      <TextField
        className="mt-2"
        color="primary"
        id="id"
        label="ID"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="publishedOn"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="date"
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="image"
        label="Image Source"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="url"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}
