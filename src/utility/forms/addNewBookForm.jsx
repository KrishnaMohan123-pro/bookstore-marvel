import React, { useState, Fragment } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addNewItem } from "../../actions/newBookAdditionActions";
import Selector from "../../components/Selector/selector";
import typeOptions from "../sortsAndFilters/newBooksType";
import { _BOOK, _CHARACTER, _SERIES } from "../sources/itemTypes";

export default function AddNewBookForm() {
  const dispatch = useDispatch();
  const [type, setType] = useState(_BOOK);

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
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    name: "",
  });
  const [newSeries, setNewSeries] = useState({
    description: "",
    endYear: "",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    startYear: "",
    title: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    const id = e.target.id;
    switch (type) {
      case _BOOK:
        setNewBook((prevValue) => {
          switch (id) {
            case "description":
              return {
                ...prevValue,
                description: value,
              };
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
            case "title":
              return {
                ...prevValue,
                title: value,
              };
            default:
              return prevValue;
          }
        });
        break;
      case _CHARACTER:
        setNewCharacter((prevValue) => {
          switch (id) {
            case "description":
              return {
                ...prevValue,
                description: value,
              };
            case "name":
              return { ...prevValue, name: value };
            case "image":
              return {
                ...prevValue,
                image: value,
              };
            default:
              return prevValue;
          }
        });
        break;
      case _SERIES:
        setNewSeries((prevValue) => {
          switch (id) {
            case "description":
              return {
                ...prevValue,
                description: value,
              };
            case "endYear":
              return { ...prevValue, endYear: value };
            case "image":
              return {
                ...prevValue,
                image: value,
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
        break;
      default:
        console.log("default");
    }
  }
  function handleNewBookAddition(e) {
    e.preventDefault();
    switch (type) {
      case _BOOK:
        dispatch(addNewItem({ ...newBook, type: _BOOK }));
        break;
      case _CHARACTER:
        dispatch(addNewItem({ ...newCharacter, type: _CHARACTER }));
        break;
      case _SERIES:
        dispatch(addNewItem({ ...newSeries, type: _SERIES }));
        break;
      default:
        console.log("default");
    }
    // dispatch(addNewBook(newBook));
    dispatch({ type: "CLOSE_DIALOG" });
  }
  function handleTypeChange(e) {
    setType(e.target.value);
  }
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
          id="name"
          label="Name"
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
      {type === _BOOK ? (
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
      ) : null}

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
      {type === _BOOK ? (
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
          required
        />
      ) : null}
      {type === _SERIES ? (
        <Fragment>
          <TextField
            className="mt-2"
            color="primary"
            id="startYear"
            label="Start Year"
            style={{ width: "100%" }}
            variant="outlined"
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            className="mt-2"
            color="primary"
            id="endYear"
            label="End Year"
            style={{ width: "100%" }}
            variant="outlined"
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
        </Fragment>
      ) : null}

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
