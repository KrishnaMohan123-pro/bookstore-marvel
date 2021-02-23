import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../../actions/authActions";

export default function EditNameForm() {
  const dispatch = useDispatch();
  const userFName = useSelector((state) => state.auth.user.fname);
  const userLName = useSelector((state) => state.auth.user.lname);
  const [name, setName] = useState({ fname: userFName, lname: userLName });
  function handleChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    setName((prevValue) => {
      switch (id) {
        case "fname":
          return { ...prevValue, fname: value };
        case "lname":
          return { ...prevValue, lname: value };
        default:
          console.log("default");
      }
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editName(name));
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className="mt-2"
        color="primary"
        id="fname"
        label="First Name"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={name.fname}
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="lname"
        label="Last Name"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={name.lname}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Edit Name
      </Button>
    </form>
  );
}
