import { fetchSeriesBySeriesID } from "../dataFetch";
import { toast } from "react-toastify";
import {
  fetchSeriesAction,
  fetchSeriesErrorAction,
} from "../actionCreators/fetchDataActionCreators";
import {
  dataLoadingAction,
  stopLoadingAction,
} from "../actionCreators/loadActionCreators";

export function fetchSeries(id) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(dataLoadingAction());
    fetchSeriesBySeriesID(id)
      .then((res) => {
        dispatch(
          fetchSeriesAction({
            characters: res.data.results[0].characters.items,
            comics: res.data.results[0].comics.items,
            creators: res.data.results[0].creators.items,
            description: res.data.results[0].description,
            endYear: res.data.results[0].endYear,
            id: res.data.results[0].id,
            image:
              res.data.results[0].thumbnail.path +
              "." +
              res.data.results[0].thumbnail.extension,
            startYear: res.data.results[0].startYear,
            title: res.data.results[0].title,
          })
        );
        dispatch(stopLoadingAction());
      })
      .catch((e) => {
        toast.error("Something went Wrong");
        dispatch(fetchSeriesErrorAction());
        dispatch(stopLoadingAction());
      });
  };
}
