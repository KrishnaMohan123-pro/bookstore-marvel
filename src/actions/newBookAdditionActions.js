import {
  addNewBookAction,
  fetchNewBooksAction,
} from "./actionCreators/newBookAdditionActionsCreator";
import {
  firebaseLoadingAction,
  stopLoadingAction,
} from "./actionCreators/loadActionCreators";
import { closeDialogAction } from "../actions/actionCreators/dialogActionsCreator";
export function addNewItem(item) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const newBooks = getState().newBooks;
    firebase
      .firestore()
      .collection("new-books")
      .add({})
      .then((docRef) => {
        firebase
          .firestore()
          .collection("new-books")
          .doc(docRef.id)
          .update({ ...item, id: docRef.id });
        newBooks.push({ ...item, id: docRef.id });
        dispatch(addNewBookAction(newBooks));
        dispatch(closeDialogAction());
      });
  };
}
export function fetchNewBooks() {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const newBooks = [];
    firebase
      .firestore()
      .collection("new-books")
      .get()
      .then((res) => {
        res.forEach((doc) => newBooks.push(doc.data()));
      })
      .then(() => {
        dispatch(fetchNewBooksAction(newBooks));
        dispatch(stopLoadingAction());
      });
  };
}
