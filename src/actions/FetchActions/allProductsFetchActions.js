import { fetchAllProducts } from "../dataFetch";
import { allProductsFetchAction } from "../actionCreators/fetchDataActionCreators";
import {
  dataLoadingAction,
  stopLoadingAction,
} from "../actionCreators/loadActionCreators";

export function allProductsFetch(type, offSet) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(dataLoadingAction());
    const response = await fetchAllProducts(type, offSet);
    const products = [];
    response.data.results.forEach((result) => products.push(result));
    dispatch(allProductsFetchAction(type, products));
    dispatch(stopLoadingAction());
  };
}

export function clearAllProducts() {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "CLEAR_ALL_PRODUCTS" });
  };
}
