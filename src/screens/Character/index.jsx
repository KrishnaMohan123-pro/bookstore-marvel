import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchCharacter } from "../../actions/FetchActions/characterFetchAction";
import Loader from "../../components/Loader/loader";
import { Container, Grid } from "@material-ui/core";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
import { useLocation } from "react-router-dom";
import { fetchCharacterAction } from "../../actions/actionCreators/fetchDataActionCreators";
import { _MARVEL } from "../../utility/sources/sources";

export default function Character(props) {
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
        for (let i = 0; i < newBooks.length; i++) {
          if (newBooks[i].id === props.id) {
            pos = i;
            break;
          }
        }
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
      }
    }
  }, [dispatch, props.id, newBooks, newBooksLoader, source]);

  if (loader || newBooksLoader) {
    return <Loader />;
  }
  if (character.error) {
    return <p>{character.error}</p>;
  }

  return (
    <section
      id="character-body"
      style={{ marginTop: "1.5rem", marginBottom: "3rem" }}
    >
      <Container>
        <Grid container>
          <Grid item lg={3}>
            <Grid container direction="column">
              <Grid
                item
                style={{
                  border: "grey 0.1rem solid",
                  padding: "3rem 0rem",
                  backgroundColor: "white",
                }}
              >
                <img
                  alt={character.name}
                  className="character-image"
                  src={character.image}
                  style={{
                    width: "200px",
                    height: "300px",
                    margin: "5px auto",
                  }}
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
            item
            lg={9}
            style={{
              border: "grey 0.1rem solid",
              backgroundColor: "white",
            }}
          >
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <h1 style={{ fontFamily: "Goldman" }}>{character.name}</h1>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item lg={4}>
                    <h6 style={{ fontFamily: "Roboto", margin: "0 auto" }}>
                      Description
                    </h6>
                  </Grid>
                  <Grid item lg={8}>
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
                  <Grid item lg={4}>
                    <h6 style={{ fontFamily: "Roboto", margin: "0 auto" }}>
                      Series
                    </h6>
                  </Grid>
                  <Grid item lg={8}>
                    <div
                      className="comic-link"
                      style={{ height: "250px", overflowY: "scroll" }}
                    >
                      {character.series.map((series) => {
                        return (
                          <Link
                            to={"/series/" + series.resourceURI.slice(43)}
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
                  <Grid item lg={4}>
                    <h6 style={{ fontFamily: "Roboto", margin: "0 auto" }}>
                      Comics
                    </h6>
                  </Grid>
                  <Grid item lg={8}>
                    <div
                      className="comic-link"
                      style={{ height: "250px", overflowY: "scroll" }}
                    >
                      {character.comics.map((comic) => {
                        return (
                          <Link
                            to={"/book/" + comic.resourceURI.slice(43)}
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
