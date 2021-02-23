import {
  addItemAction,
  removeItemAction,
  increaseItemAction,
  decreaseItemAction,
  initialiseCartAction,
} from "./actionCreators/cartActionCreators";
import {
  firebaseLoadingAction,
  stopLoadingAction,
} from "../actions/actionCreators/loadActionCreators";
export function addToCart(book) {
  return async (dispatch, getState, { getFirebase }) => {
    const uid = getState().auth.uid;
    const firebase = getFirebase();
    const cart = getState().cart.cart;
    cart.push(book);
    const token = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("books")
      .doc(book.id.toString())
      .set({
        id: book.id,
        title: book.title,
        img: book.img,
        price: book.price,
        source: book.source,
        quantity: book.quantity,
      })
      .then(() => {
        return true;
      })
      .catch((e) => {
        return false;
      });
    if (token) {
      dispatch(addItemAction(cart));
    }
  };
}

export function removeFromCart(book) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const cart = getState().cart.cart;
    const uid = getState().firebase.auth.uid;
    let newCartData = cart.filter((item) => item.id !== book.id);

    const token = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("books")
      .doc(book.id.toString())
      .delete()
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
    if (token) {
      dispatch(removeItemAction(newCartData));
    }
  };
}

export function changeQuantity(type, bookId) {
  return async (dispatch, getState, { getFirebase }) => {
    const uid = getState().auth.uid;
    const firebase = getFirebase();
    const cart = getState().cart.cart;
    let newQuantity = 0;
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].id === bookId) {
        if (type === "INCREASE") {
          cart[i].quantity += 1;
          newQuantity = cart[i].quantity;
        } else if (type === "DECREASE") {
          cart[i].quantity -= 1;
          newQuantity = cart[i].quantity;
        }
      }
    }

    const token = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("books")
      .doc(bookId.toString())
      .update({ quantity: newQuantity })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
    if (token) {
      switch (type) {
        case "INCREASE":
          dispatch(increaseItemAction(cart));
          break;
        case "DECREASE":
          dispatch(decreaseItemAction(cart));
          break;
        default:
          console.log("default");
      }
    }
  };
}
export function initialiseCart(uid) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const cartDataArray = [];
    const firebaseResponse = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("books")
      .get();
    firebaseResponse.forEach((doc) => cartDataArray.push(doc.data()));
    dispatch(initialiseCartAction(cartDataArray));
    dispatch(stopLoadingAction());
  };
}
