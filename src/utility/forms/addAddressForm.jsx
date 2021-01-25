import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions/authActions";

export default function AddAddressForm() {
  const userAddress = useSelector((state) => state.auth.user.address);
  const [address, setAddress] = useState(userAddress);
  const dispatch = useDispatch();

  function handleChange(e) {
    var id = e.target.id;
    var value = e.target.value;
    setAddress((prevValue) => {
      switch (id) {
        case "addressLine1":
          return {
            addressLine1: value,
            addressLine2: prevValue.addressLine2,
            pin: prevValue.pin,
            city: prevValue.city,
            state: prevValue.state,
            country: prevValue.country,
          };
        case "addressLine2":
          return {
            addressLine1: prevValue.addressLine1,
            addressLine2: value,
            pin: prevValue.pin,
            city: prevValue.city,
            state: prevValue.state,
            country: prevValue.country,
          };
        case "pin":
          return {
            addressLine1: prevValue.addressLine1,
            addressLine2: prevValue.addressLine2,
            pin: value,
            city: prevValue.city,
            state: prevValue.state,
            country: prevValue.country,
          };
        case "city":
          return {
            addressLine1: prevValue.addressLine1,
            addressLine2: prevValue.addressLine2,
            pin: prevValue.pin,
            city: value,
            state: prevValue.state,
            country: prevValue.country,
          };
        case "state":
          return {
            addressLine1: prevValue.addressLine1,
            addressLine2: prevValue.addressLine2,
            pin: prevValue.pin,
            city: prevValue.city,
            state: value,
            country: prevValue.country,
          };
        case "country":
          return {
            addressLine1: prevValue.addressLine1,
            addressLine2: prevValue.addressLine2,
            pin: prevValue.pin,
            city: prevValue.city,
            state: prevValue.state,
            country: value,
          };
        default:
          return prevValue;
      }
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addAddress(address));
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
