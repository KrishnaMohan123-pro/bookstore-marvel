import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCharacter } from "../../actions/FetchActions/characterFetchAction";
import Loader from "../../components/Loader/loader";
import { Grid, Divider } from "@material-ui/core";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchCharacterAction,
  fetchCharacterErrorAction,
} from "../../actions/actionCreators/fetchDataActionCreators";
import { _MARVEL, _OUR_COLLECTION } from "../../utility/sources/sources";
import { _CHARACTER } from "../../utility/sources/itemTypes";

export default function Character(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get("source");

  const character = useSelector((state) => state.character);
  const loader = useSelector((state) => state.loader.data);
  const newBooksLoader = useSelector((state) => state.loader.profile);
  const newBooks = useSelector((state) => state.newBooks);
  useEffect(() => {
    if (source === _MARVEL) {
      dispatch(fetchCharacter(props.id));
    } else {
      if (!newBooksLoader) {
        let pos = 0;
        let flag = false;
        for (let i = 0; i < newBooks.length; i++) {
          if (newBooks[i].id === props.id) {
            pos = i;
            flag = true;
            break;
          }
        }
        if (flag) {
          dispatch(
            fetchCharacterAction({
              comics: [],
              description: newBooks[pos].description,
              id: newBooks[pos].id,
              image: newBooks[pos].image,
              name: newBooks[pos].name,
              series: [],
            })
          );
        } else {
          dispatch(fetchCharacterErrorAction());
        }
      }
    }
  }, [dispatch, props.id, newBooks, newBooksLoader, source]);

  if (loader || newBooksLoader) {
    return <Loader />;
  }

  // When source is not present in URL or source is wrong
  if (
    !location.search.includes("source") ||
    (source !== _MARVEL && source !== _OUR_COLLECTION)
  ) {
    return (
      <div className="mt-2">
        <p>Which collection do you wish to see?</p>
        <p
          onClick={() => {
            history.push({
              pathname: `/${_CHARACTER}/${props.id}`,
              search: `?source=${_MARVEL}`,
            });
          }}
          style={{ cursor: "pointer" }}
        >
          Marvel
        </p>
        <p
          onClick={() => {
            history.push({
              pathname: `/${_CHARACTER}/${props.id}`,
              search: `?source=${_OUR_COLLECTION}`,
            });
          }}
          style={{ cursor: "pointer" }}
        >
          Our Collection
        </p>
      </div>
    );
  }

  if (character.error) {
    return <p>{character.error}</p>;
  }

  return (
    <section id="character-body">
      <Grid container spacing={0}>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
          <Grid container direction="column" style={{ position: "relative" }}>
            {/* <div className="product-img-bg-1"></div> */}
            <Grid className="character-image-box" item>
              <img
                alt={character.name}
                className="character-image"
                src={character.image}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xl={1} lg={1} md={1} sm={12} xs={12}></Grid>
        <Grid
          className="character-description-box"
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <Grid container direction="column">
            <Grid item className="description-container">
              <h1 className="character-title">{character.name}</h1>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item lg={4} md={4} sm={4} xs={12}>
                  <h5 className="description-section-label">Description</h5>
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={12}>
                  <p>
                    {character.description === null ||
                    character.description.length === 0
                      ? "No Description Available"
                      : character.description}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ width: "40%", margin: "0 auto" }} />
            <Grid item className="description-container">
              <Grid container>
                <Grid item lg={4} md={4} sm={4} xs={12}>
                  <h5 className="description-section-label">Series</h5>
                </Grid>

                <Grid item lg={8} md={8} sm={8} xs={12}>
                  {character.series.length === 0 ? (
                    <p>No Series Available</p>
                  ) : (
                    <div className="series-table-section">
                      {character.series.map((series) => {
                        return (
                          <Link
                            to={{
                              pathname:
                                "/series/" + series.resourceURI.slice(43),
                              search: `?source=${_MARVEL}`,
                            }}
                            key={series.resourceURI.slice(43)}
                          >
                            <p>
                              {series.name.length > 25
                                ? series.name.slice(0, 25) + "..."
                                : series.name}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ width: "40%", margin: "0 auto" }} />
            <Grid item className="description-container">
              <Grid container>
                <Grid item lg={4} md={4} sm={4} xs={12}>
                  <h5 className="description-section-label">Comics</h5>
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={12}>
                  {character.comics.length === 0 ? (
                    <p>No Comics Released</p>
                  ) : (
                    <div className="comics-table-section">
                      {character.comics.map((comic) => {
                        return (
                          <Link
                            to={{
                              pathname: "/book/" + comic.resourceURI.slice(43),
                              search: `?source=${_MARVEL}`,
                            }}
                            key={comic.resourceURI.slice(43)}
                          >
                            <p>
                              {comic.name.length > 25
                                ? comic.name.slice(0, 25) + "..."
                                : comic.name}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ width: "40%", margin: "0 auto" }} />
            <Grid item className="description-container">
              <div style={{ display: "flex", margin: "1rem 0" }}>
                <SaveItemsButton
                  id={character.id}
                  img={character.image}
                  title={character.name}
                  type="character"
                  source={source}
                />
              </div>
            </Grid>
            <Divider style={{ width: "40%", margin: "0 auto" }} />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
