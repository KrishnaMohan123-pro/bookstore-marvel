import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { addPhone } from "../../actions/authActions";
import { toast } from "react-toastify";
import "./styles.css";

export default function ProfileName(props) {
  const dispatch = useDispatch();
  const [phone, setPhone] = React.useState(props.phone);
  const [edit, setEdit] = React.useState(false);
  var regExp = /[a-zA-Z]/g;

  function handleChange(e) {
    setPhone(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!regExp.test(phone) && phone.length === 10) {
      dispatch(addPhone(phone));
      setEdit(false);
    } else {
      toast.error("Phone number not valid");
    }
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
        Phone
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
        <input
          className="profile-phone"
          value={phone}
          disabled={!edit}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />

        {edit ? (
          <IconButton className="edit-button" type="submit">
            <SaveIcon fontSize="small" color="secondary" />
          </IconButton>
        ) : null}
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
      </form>
    </React.Fragment>
  );
}
