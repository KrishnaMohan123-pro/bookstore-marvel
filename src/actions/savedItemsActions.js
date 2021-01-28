import {
  intialiseSavedCharacterAction,
  intialiseSavedSeriesAction,
  removeCharacterAction,
  removeSeriesAction,
  saveCharacterAction,
  saveSeriesAction,
} from "./actionCreators/savedItemsActionCreators";
import {
  firebaseLoadingAction,
  stopLoadingAction,
} from "../actions/actionCreators/loadActionCreators";

export function saveItem(type, item) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const uid = getState().auth.uid;
    const savedItems = getState().savedItems;
    firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection(type)
      .doc(item.id.toString())
      .set(item);

    switch (type) {
      case "series":
        const prevSeries = savedItems.series;
        prevSeries.push(item);
        dispatch(saveSeriesAction(prevSeries));
        break;
      case "character":
        const prevCharacter = savedItems.character;
        prevCharacter.push(item);
        dispatch(saveCharacterAction(prevCharacter));
        break;
      default:
        console.log("default");
    }
  };
}
export function initialiseSavedItems(uid) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const seriesDataArray = [];
    const characterDataArray = [];
    console.log("saved items");
    console.log(uid);
    const seriesResponse = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("series")
      .get();
    const characterResponse = await firebase
      .firestore()
      .collection("cart")
      .doc(uid)
      .collection("character")
      .get();
    console.log(characterResponse);
    seriesResponse.forEach((doc) => {
      seriesDataArray.push(doc.data());
    });
    characterResponse.forEach((doc) => characterDataArray.push(doc.data()));
    dispatch(intialiseSavedCharacterAction(characterDataArray));
    dispatch(intialiseSavedSeriesAction(seriesDataArray));
    dispatch(stopLoadingAction());
  };
}
