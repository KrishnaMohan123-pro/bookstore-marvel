import {
  _LOAD_ALL_PRODUCTS,
  _LOAD_ALL_COMICS,
  _LOAD_ALL_CHARACTERS,
  _LOAD_ALL_SERIES,
} from "../../actions/actionsList/allProductsActionsList";
const intialState = { series: [], characters: [], comics: [] };

export default function allProducts(state = intialState, action) {
  switch (action.type) {
    case _LOAD_ALL_COMICS:
      return { ...state, comics: state.comics.concat(action.payload) };
    case _LOAD_ALL_SERIES:
      return { ...state, series: state.series.concat(action.payload) };
    case _LOAD_ALL_CHARACTERS:
      return { ...state, characters: state.characters.concat(action.payload) };
    case "CLEAR_ALL_PRODUCTS":
      return intialState;
    default:
      return state;
  }
}
