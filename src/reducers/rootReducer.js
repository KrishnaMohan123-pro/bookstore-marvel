import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import characterReducer from "./marvelDataFetchReducers/characterReducer";
import comicsReducer from "./marvelDataFetchReducers/comicsReducer";
import dialogReducer from "./dialogReducers";
import dropDownOptionsReducer from "./dropDownOptionsReducer";
import genericSearchReducer from "./genericSeachReducer";
import loaderReducer from "./loaderReducer";
import loggedInReducer from "./loggedInReducer";
import modalReducer from "./modalReducer";
import newBooksReducer from "./newBooksReducer";
import seriesReducer from "./marvelDataFetchReducers/seriesReducer";
import queryReducer from "./queryReducer";
import savedItemsReducer from "./savedItemsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  character: characterReducer,
  comics: comicsReducer,
  dialog: dialogReducer,
  dropDown: dropDownOptionsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  genericSearch: genericSearchReducer,
  loader: loaderReducer,
  loggedIn: loggedInReducer,
  modal: modalReducer,
  newBooks: newBooksReducer,
  series: seriesReducer,
  query: queryReducer,
  savedItems: savedItemsReducer,
});

export default rootReducer;
