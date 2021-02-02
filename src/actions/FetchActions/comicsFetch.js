import { fetchComicsByComicsId } from "../dataFetch";
import { toast } from "react-toastify";
import {
  fetchComicsAction,
  fetchComicsErrorAction,
} from "../actionCreators/fetchDataActionCreators";
import {
  dataLoadingAction,
  stopLoadingAction,
} from "../actionCreators/loadActionCreators";

export function fetchComics(id) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(dataLoadingAction());
    const res = await fetchComicsByComicsId(id);
    if (res.code === 200) {
      dispatch(
        fetchComicsAction({
          characters: res.data.results[0].characters.items,
          creators: res.data.results[0].creators.items,
          description: res.data.results[0].description,
          id: res.data.results[0].id,
          image:
            res.data.results[0].thumbnail.path +
            "." +
            res.data.results[0].thumbnail.extension,
          price: res.data.results[0].prices[0].price,
          publishDate: res.data.results[0].dates[0].date.slice(0, 10),
          title: res.data.results[0].title,
        })
      );
    } else {
      toast.error("Something went wrong");
      dispatch(stopLoadingAction());
      dispatch(fetchComicsErrorAction());
    }
    if (res) dispatch(stopLoadingAction());
  };
}
