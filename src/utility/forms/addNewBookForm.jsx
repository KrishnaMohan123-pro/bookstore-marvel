import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addNewBook } from "../../actions/newBookAdditionActions";
import Selector from "../../components/Selector/selector";

export default function AddNewBookForm() {
  const dispatch = useDispatch();
  const [type, setType] = useState("book");

  const [newItem, setNewItem] = useState({
    description: "",
    endYear: "",
    image: "",
    name: "",
    publishedOn: "",
    price: "",
    startYear: "",
    title: "",
  });
  const [newBook, setNewBook] = useState({
    description: "",
    id: "",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    publishedOn: "",
    price: 0,
    title: "",
  });
  const [newCharacter, setNewCharacter] = useState({
    description: "",
    image: "",
    name: "",
  });
  const [newSeries, setNewSeries] = useState({
    description: "",
    endYear: "",
    image: "",
    startYear: "",
    title: "",
  });

  const typeOptions = [
    { name: "COMICS", value: "book" },
    { name: "CHARACTER", value: "character" },
    { name: "SERIES", value: "series" },
  ];

  function assignValue() {
    switch (type) {
      case "book":
        setNewBook(newItem);
        break;
      case "character":
        setNewCharacter(newItem);
        break;
      case "series":
        setNewSeries(newItem);
        break;
      default:
        console.log("Default");
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const id = e.target.id;
    setNewItem((prevValue) => {
      switch (id) {
        case "description":
          return {
            ...prevValue,
            description: value,
          };
        case "endYear":
          return { ...prevValue, endYear: value };
        case "name":
          return { ...prevValue, name: value };
        case "image":
          return {
            ...prevValue,
            image: value,
          };
        case "publishedOn":
          return {
            ...prevValue,
            publishedOn: value,
          };
        case "price":
          return {
            ...prevValue,
            price: value,
          };
        case "startYear":
          return { ...prevValue, startYear: value };
        case "title":
          return {
            ...prevValue,
            title: value,
          };
        default:
          return prevValue;
      }
    });
    assignValue();
  }
  console.log(newCharacter, newBook, newSeries);
  function handleNewBookAddition(e) {
    e.preventDefault();
    dispatch(addNewBook(newBook));
    dispatch({ type: "CLOSE_DIALOG" });
  }
  function handleTypeChange(e) {
    setType(e.target.value);
  }
  console.log(type);
  return (
    <form onSubmit={(e) => handleNewBookAddition(e)}>
      <Selector
        options={typeOptions}
        onChange={handleTypeChange}
        value={type}
        label="TYPE"
      />
      {type === "character" ? (
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
      ) : (
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
      )}

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
        id="publishedOn"
        label="Publish Date"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={null}
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
