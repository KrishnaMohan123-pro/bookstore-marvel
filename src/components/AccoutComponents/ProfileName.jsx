import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { editName } from "../../actions/authActions";
import "./styles.css";

export default function ProfileName(props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(props.name);
  const [edit, setEdit] = React.useState(false);

  function handleChange(e) {
    setName(e.target.value);
  }
  function handleFormSubmit(e) {
    console.log("form submitted!!!");
    e.preventDefault();
    dispatch(editName({ fname: name, lname: "" }));
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
        Name
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
          className="profile-name"
          value={name}
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
