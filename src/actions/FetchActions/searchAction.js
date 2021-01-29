import {
  fetchComicsWithStartName,
  fetchSeriesByStartName,
  fetchWithStartName,
} from "../dataFetch";
import {
  searchAction,
  dropDownAction,
  clearDropDownAction,
} from "../actionCreators/fetchDataActionCreators";
import {
  dataLoadingAction,
  stopLoadingAction,
} from "../actionCreators/loadActionCreators";
export function search(name, sort, filter) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(dataLoadingAction());
    switch (filter) {
      case "characters":
        fetchWithStartName(name, sort).then((res) => {
          dispatch(
            searchAction({ total: res.data.total, results: res.data.results })
          );
          dispatch(stopLoadingAction());
        });
        break;
      case "series":
        fetchSeriesByStartName(name, "", sort, "").then((res) => {
          dispatch(
            searchAction({ total: res.data.total, results: res.data.results })
          );
          dispatch(stopLoadingAction());
        });
        break;
      case "comics":
        fetchComicsWithStartName(name, sort).then((res) => {
          dispatch(
            searchAction({ total: res.data.total, results: res.data.results })
          );
          dispatch(stopLoadingAction());
        });
        break;
      default:
    }
  };
}

export function dropDown(startName) {
  return (dispatch, getState, { getFirebase }) => {
    fetchWithStartName(startName, "").then((res) => {
      const characters = [];
      res.data.results.forEach((result) => {
        characters.push({ name: result.name, id: result.id });
      });
      dispatch(dropDownAction(characters));
    });
  };
}

export function clearDropDown() {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(clearDropDownAction());
  };
}
