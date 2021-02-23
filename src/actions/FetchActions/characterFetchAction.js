import { fetchCharacterByCharacterId } from "../dataFetch";
import { toast } from "react-toastify";
import {
  dataLoadingAction,
  stopLoadingAction,
} from "../actionCreators/loadActionCreators";

import {
  fetchCharacterAction,
  fetchCharacterErrorAction,
} from "../actionCreators/fetchDataActionCreators";

export function fetchCharacter(id) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(dataLoadingAction());
    fetchCharacterByCharacterId(id)
      .then((res) => {
        dispatch(
          fetchCharacterAction({
            comics: res.data.results[0].comics.items,
            description: res.data.results[0].description,
            id: res.data.results[0].id,
            image:
              res.data.results[0].thumbnail.path +
              "." +
              res.data.results[0].thumbnail.extension,
            name: res.data.results[0].name,
            series: res.data.results[0].series.items,
          })
        );
        dispatch(stopLoadingAction());
      })
      .catch((e) => {
        toast.error("Something went wrong");
        dispatch({ type: "STOP_LOADING" });
        dispatch(fetchCharacterErrorAction());
      });
  };
}
