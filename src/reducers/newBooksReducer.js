import {
  _NEW_BOOK_ADD,
  _FETCH_NEW_BOOKS,
} from "../actions/actionsList/newBooksActionsList";

import { toast } from "react-toastify";
const initialState = { loaded: false };
export default function newBooksReducer(state = initialState, action) {
  switch (action.type) {
    case _NEW_BOOK_ADD:
      toast.success("Book added Successfully");
      return action.payload;
    case _FETCH_NEW_BOOKS:
      return action.payload;
    default:
      return state;
  }
}
