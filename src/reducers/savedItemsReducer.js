import {
  _INITIALISE_SAVED_LIST_CHARACTER,
  _INITIALISE_SAVED_LIST_SERIES,
  _REMOVE_CHARACTER,
  _REMOVE_SERIES,
  _SAVE_CHARACTER,
  _SAVE_SERIES,
} from "../actions/actionsList/savedItemsActionsList";
import { toast } from "react-toastify";
const initialState = {
  series: [],
  character: [],
};
export default function savedItemsReducer(state = initialState, action) {
  switch (action.type) {
    case _REMOVE_CHARACTER:
      toast.error("Removed from list");
      return { series: [...state.series], character: action.payload };
    case _REMOVE_SERIES:
      toast.error("Removed from list");
      return { series: action.payload, character: [...state.character] };
    case _SAVE_CHARACTER:
      toast.success("Added to list");
      return { series: [...state.series], character: action.payload };
    case _SAVE_SERIES:
      toast.success("Added to list");
      return { series: action.payload, character: [...state.character] };
    case _INITIALISE_SAVED_LIST_CHARACTER:
      return {
        series: [...state.series],
        character: action.payload,
      };
    case _INITIALISE_SAVED_LIST_SERIES:
      return {
        series: action.payload,
        character: [...state.character],
      };
    default:
      return state;
  }
}
