import React, { useState, useEffect, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import SearchedBody from "./searchedBody";
export default function Characters() {
  const dispatch = useDispatch();
  const showSearchBody = useSelector((state) => state.search.showSearchBody);
  const [search, setSearch] = useState("");
  function handleChange(e) {
    let value = e.target.value;
    setSearch(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "CLEAR_SEARCH" });
    setTimeout(() => {
      dispatch({ type: "SEARCH_START_WITH", payload: { name: search } });
    }, 50);
  }
  return (
    <Fragment>
      <Paper
        component="form"
        style={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "500px",
          margin: "100px auto",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          placeholder="Search for your favourite Marvel Character"
          inputProps={{ "aria-label": "search google maps" }}
          style={{ width: "90%", marginLeft: "5px" }}
          onChange={handleChange}
          value={search}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {showSearchBody ? <SearchedBody /> : null}
    </Fragment>
  );
}
