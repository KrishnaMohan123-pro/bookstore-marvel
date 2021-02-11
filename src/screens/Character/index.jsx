import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCharacter } from "../../actions/FetchActions/characterFetchAction";
import Loader from "../../components/Loader/loader";
import { Container, Grid } from "@material-ui/core";
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
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Grid container direction="column">
              <Grid className="character-image-box" item>
                <img
                  alt={character.name}
                  className="character-image"
                  src={character.image}
                />
              </Grid>
              <Grid item>
                <div>
                  <SaveItemsButton
                    id={character.id}
                    img={character.image}
                    title={character.name}
                    type="character"
                    source={source}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="character-description-box"
            item
            lg={9}
            md={9}
            sm={12}
            xs={12}
          >
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <h1 className="character-title">{character.name}</h1>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <h6 className="description-section-label">Description</h6>
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
              <Grid item>
                <Grid container>
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <h6 className="description-section-label">Series</h6>
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={12}>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <h6 className="description-section-label">Comics</h6>
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={12}>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
