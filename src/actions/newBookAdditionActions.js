import {
  addNewBookAction,
  fetchNewBooksAction,
} from "./actionCreators/newBookAdditionActionsCreator";
import {
  firebaseLoadingAction,
  stopLoadingAction,
} from "./actionCreators/loadActionCreators";

export function addNewBook(book) {
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
          .update({ book: { ...book, id: docRef.id } });
        newBooks.push({ book: { ...book, id: docRef.id } });
        dispatch(addNewBookAction(newBooks));
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
