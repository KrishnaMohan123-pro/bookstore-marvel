import React, { useState, useEffect } from "react";
import DebounceInput from "react-debounce-input";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Link } from "react-router-dom";
import {
  dropDown,
  clearDropDown,
} from "../../actions/FetchActions/searchAction";
import { useDispatch, useSelector } from "react-redux";
import { characterSortOptions } from "../../utility/sortsAndFilters/sort";
import filterOptions from "../../utility/sortsAndFilters/filter";
import { _MARVEL } from "../../utility/sources/sources";
import "./styles.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownOptions = useSelector((state) => state.dropDown);
  const query = useSelector((state) => state.query);
  const [name, setName] = useState(query);
  useEffect(() => {
    setName(query);
  }, [query]);
  function onInputChange(event) {
    setName(event.target.value);
    setShowDropDown(true);
    dispatch(clearDropDown());
    if (event.target.value.length > 0) dispatch(dropDown(event.target.value));
  }
  function onFormSubmit(e) {
    e.preventDefault();
    setShowDropDown(false);

    if (name.length > 0) {
      history.push({
        pathname: "/search",
        search: `?query=${name}&sort=${characterSortOptions[1].value}&filter=${filterOptions[0].value}`,
      });
    }
  }

  return (
    <div className="search-bar">
      <Paper
        className="search-form"
        component="form"
        elevation={0}
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
      >
        <DebounceInput
          className="search-input"
          debounceTimeout={300}
          element={TextField}
          onChange={(event) => {
            if (event.target.value.length === 0) {
              dispatch(clearDropDown());
            } else onInputChange(event);
          }}
          placeholder="Search"
          value={name}
        />
        <IconButton type="submit" className="search-button">
          <SearchIcon />
        </IconButton>
      </Paper>
      {showDropDown && dropDownOptions.characters.length !== 0 ? (
        <span
          style={{
            height: "10rem",
            overflowY: "scroll",
            position: "absolute",
            width: "30rem",
            left: "0%",
            backgroundColor: "white",
          }}
        >
          <Table>
            <TableBody>
              {dropDownOptions.characters.map((character) => {
                return (
                  <TableRow key={character.id}>
                    <TableCell component="th">
                      <Link
                        to={{
                          pathname: "/character/" + character.id,
                          search: `?source=${_MARVEL}`,
                        }}
                        onClick={() => {
                          setShowDropDown(false);
                        }}
                      >
                        {character.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </span>
      ) : null}
    </div>
  );
}
