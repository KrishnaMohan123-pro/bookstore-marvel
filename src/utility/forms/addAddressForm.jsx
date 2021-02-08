import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions/authActions";
import { toast } from "react-toastify";

export default function AddAddressForm() {
  const userAddress = useSelector((state) => state.auth.user.address);
  const [address, setAddress] = useState(userAddress);
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  var regExp = /[a-zA-Z]/g;

  function handleChange(e) {
    setErr(false);
    const id = e.target.id;
    const value = e.target.value;
    setAddress((prevValue) => {
      switch (id) {
        case "addressLine1":
          return {
            ...prevValue,
            addressLine1: value,
          };
        case "addressLine2":
          return {
            ...prevValue,
            addressLine2: value,
          };
        case "pin":
          return {
            ...prevValue,
            pin: value,
          };
        case "city":
          return {
            ...prevValue,
            city: value,
          };
        case "state":
          return {
            ...prevValue,
            state: value,
          };
        case "country":
          return {
            ...prevValue,
            country: value,
          };
        default:
          return prevValue;
      }
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!regExp.test(address.pin) && address.pin.length === 6) {
      dispatch(addAddress(address));
    } else {
      toast.error("Entered Wrong Pin");
    }
  }
  return (
    <form
      style={{ width: "25rem", padding: "1rem", margin: "1rem" }}
      onSubmit={handleSubmit}
    >
      <TextField
        className="mt-2"
        color="primary"
        id="addressLine1"
        label="Address Line 1"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.addressLine1}
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="addressLine2"
        label="Address Line 2"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.addressLine2}
      />
      <TextField
        className="mt-2"
        color="primary"
        id="pin"
        label="Pin"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.pin}
        required
        error={err}
      />
      <TextField
        className="mt-2"
        color="primary"
        id="city"
        label="City"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.city}
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="state"
        label="State"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.state}
        required
      />
      <TextField
        className="mt-2"
        color="primary"
        id="country"
        label="Country"
        style={{ width: "100%" }}
        variant="outlined"
        onChange={handleChange}
        type="text"
        value={address.country}
        required
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </form>
  );
}
