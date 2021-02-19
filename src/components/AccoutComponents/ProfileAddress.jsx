import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { addAddress } from "../../actions/authActions";
import { toast } from "react-toastify";
import "./styles.css";

export default function ProfileName(props) {
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState(props.address);
  const [edit, setEdit] = React.useState(false);
  const [err, setErr] = React.useState(false);
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
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!regExp.test(address.pin) && address.pin.length === 6) {
      dispatch(addAddress(address));
    } else {
      toast.error("Entered Wrong Pin");
    }
    setEdit(false);
  }

  return (
    <React.Fragment>
      <p
        style={{
          fontFamily: "Goldman",
          padding: 0,
          margin: "0 auto 0 0",
          textAlign: "left",
          textDecoration: "underline",
        }}
      >
        Address
      </p>

      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
        style={{
          position: "relative",
          padding: "0",
        }}
      >
        {edit ? null : (
          <IconButton
            className="edit-button"
            type="button"
            onClick={() => {
              setEdit(true);
            }}
          >
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        )}
        {edit ? (
          <IconButton className="edit-button" type="submit">
            <SaveIcon fontSize="small" color="secondary" />
          </IconButton>
        ) : null}
        <input
          id={"addressLine1"}
          className="profile-address"
          value={address.addressLine1}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <input
          id={"addressLine2"}
          className="profile-address"
          value={address.addressLine2}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <input
          id={"pin"}
          className="profile-address"
          value={address.pin}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <input
          id={"city"}
          className="profile-address"
          value={address.city}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <input
          id={"state"}
          className="profile-address"
          value={address.state}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <input
          id={"country"}
          className="profile-address"
          value={address.country}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </form>
    </React.Fragment>
  );
}
