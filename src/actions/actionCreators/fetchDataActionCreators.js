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

import { _LOAD_ALL_PRODUCTS } from "../actionsList/allProductsActionsList";

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

export function allProductsFetchAction(products) {
  return { type: _LOAD_ALL_PRODUCTS, payload: products };
}
