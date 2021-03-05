import {
  _CHARACTER_DATA_LOAD,
  _CHARACTER_DATA_LOAD_ERROR,
  _SEARCH_DATA_LOAD,
  _SEARCHED_NAMES,
  _CLEAR_SEARCH,
  _SERIES_DATA_LOAD,
  _SERIES_DATA_LOAD_ERROR,
  _COMICS_DATA_LOAD,
  _COMICS_DATA_LOAD_ERROR,
} from "../actionsList/dataFetchActionsList";

import {
  _LOAD_ALL_PRODUCTS,
  _LOAD_ALL_COMICS,
  _LOAD_ALL_CHARACTERS,
  _LOAD_ALL_SERIES,
} from "../actionsList/allProductsActionsList";
import { _BOOK, _CHARACTER, _SERIES } from "../../utility/sources/itemTypes";

export function fetchCharacterAction(characterData) {
  return { type: _CHARACTER_DATA_LOAD, payload: characterData };
}
export function fetchCharacterErrorAction(err) {
  return {
    type: _CHARACTER_DATA_LOAD_ERROR,
    payload: { error: "NO CHARACTER WITH THE ID AVAILABLE" },
  };
}
export function searchAction(searchResult) {
  return { type: _SEARCH_DATA_LOAD, payload: searchResult };
}

export function dropDownAction(namesList) {
  return { type: _SEARCHED_NAMES, payload: { characters: namesList } };
}
export function clearDropDownAction() {
  return { type: _CLEAR_SEARCH };
}
export function fetchComicsAction(comicsData) {
  return { type: _COMICS_DATA_LOAD, payload: comicsData };
}
export function fetchComicsErrorAction(err) {
  return {
    type: _COMICS_DATA_LOAD_ERROR,
    payload: { error: "NO COMICS WITH THE ID AVAILABLE" },
  };
}

export function fetchSeriesAction(seriesData) {
  return { type: _SERIES_DATA_LOAD, payload: seriesData };
}
export function fetchSeriesErrorAction() {
  return {
    type: _SERIES_DATA_LOAD_ERROR,
    payload: { error: "NO SERIES WITH THE ID AVAILABLE" },
  };
}

export function allProductsFetchAction(type, products) {
  switch (type) {
    case _BOOK:
      return { type: _LOAD_ALL_COMICS, payload: products };
    case _SERIES:
      return { type: _LOAD_ALL_SERIES, payload: products };
    case _CHARACTER:
      return { type: _LOAD_ALL_CHARACTERS, payload: products };
  }
}
export function allSeriesFetchAction(series) {
  return { type: _LOAD_ALL_SERIES, payload: series };
}
export function allCharactersFetchAction(characters) {
  return { type: _LOAD_ALL_CHARACTERS, payload: characters };
}
export function allComicsFetchAction(comics) {
  return { type: _LOAD_ALL_COMICS, payload: comics };
}
