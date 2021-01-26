import {
  addNewBookAction,
  fetchNewBooksAction,
} from "./actionCreators/newBookAdditionActionsCreator";

export function addNewBook(book) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const newBooks = getState().newBooks;
    firebase
      .firestore()
      .collection("new-books")
      .doc(book.id)
      .set({ book: book });
  };
}
export function fetchNewBooks() {
  return (dispatch, getState, { getFirebase }) => {
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
      });
  };
}
