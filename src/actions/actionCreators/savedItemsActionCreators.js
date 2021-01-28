import {
  _INITIALISE_SAVED_LIST_CHARACTER,
  _INITIALISE_SAVED_LIST_SERIES,
  _REMOVE_CHARACTER,
  _REMOVE_SERIES,
  _SAVE_CHARACTER,
  _SAVE_SERIES,
} from "../actionsList/savedItemsActionsList";

export function intialiseSavedSeriesAction(series) {
  return {
    type: _INITIALISE_SAVED_LIST_SERIES,
    payload: series,
  };
}
export function intialiseSavedCharacterAction(character) {
  return {
    type: _INITIALISE_SAVED_LIST_CHARACTER,
    payload: character,
  };
}

export function removeCharacterAction(character) {
  return {
    type: _REMOVE_CHARACTER,
    payload: character,
  };
}
export function removeSeriesAction(series) {
  return {
    type: _REMOVE_SERIES,
    payload: series,
  };
}
export function saveCharacterAction(character) {
  return {
    type: _SAVE_CHARACTER,
    payload: character,
  };
}
export function saveSeriesAction(series) {
  return {
    type: _SAVE_SERIES,
    payload: series,
  };
}
