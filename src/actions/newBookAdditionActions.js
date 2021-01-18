export function addNewBook(book) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const newBooks = getState().newBooks;
    newBooks.push({ book: book });

    dispatch({ type: "NEW_BOOK_ADDED", payload: newBooks });
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
        dispatch({ type: "FETCHED_DATA", payload: newBooks });
      });
  };
}
