import { _LOAD_ALL_PRODUCTS } from "../../actions/actionsList/allProductsActionsList";
const intialState = [];

export default function allProducts(state = intialState, action) {
  switch (action.type) {
    case _LOAD_ALL_PRODUCTS:
      return state.concat(action.payload);
    default:
      return state;
  }
}
