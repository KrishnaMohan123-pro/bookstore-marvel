import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../../actions/FetchActions/seriesFetchAction";
import "./styles.css";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
import { useLocation } from "react-router-dom";
import { _MARVEL } from "../../utility/sources/sources";
import { fetchSeriesAction } from "../../actions/actionCreators/fetchDataActionCreators";

export default function Series(props) {
  const series = useSelector((state) => state.series);
  const loader = useSelector((state) => state.loader.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get("source");
  const newBooks = useSelector((state) => state.newBooks);
  const newBooksLoader = useSelector((state) => state.loader.profile);

  useEffect(() => {
    if (source === _MARVEL) {
      dispatch(fetchSeries(props.id));
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
          fetchSeriesAction({
            characters: [],
            comics: [],
            creators: [],
            description: newBooks[pos].description,
            endYear: newBooks[pos].endYear,
            id: newBooks[pos].id,
            image: newBooks[pos].image,
            startYear: newBooks[pos].startYear,
            title: newBooks[pos].title,
          })
        );
      }
    }
  }, [dispatch, props.id, newBooks, newBooksLoader, source]);
  //   When Data not loaded
  if (loader) return <Loader />;
  // if Series not found
  if (series.error) {
    return <p>{series.error}</p>;
  }

  return (
    <section id="series-description">
      <Container fixed style={{ marginTop: "1.5rem", marginBottom: "3rem " }}>
        <Grid container>
          <Grid item alignItems="center" lg={3}>
            <Grid container direction="column">
              <Grid
                item
                style={{
                  border: "grey 0.1rem solid",
                  padding: "3rem 0rem",
                  backgroundColor: "white",
                }}
              >
                <div>
                  <img
                    className="book-img"
                    src={series.image}
                    alt={series.title}
                  />
                </div>
              </Grid>
              <Grid item>
                <div>
                  <SaveItemsButton
                    id={series.id}
                    img={series.image}
                    title={series.title}
                    type="series"
                    source={source}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={9}
            alignContent="center"
            style={{
              border: "grey 0.1rem solid",
              backgroundColor: "white",
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <div className="book-title">
                  <h2>{series.title}</h2>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>Description</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        <p>
                          {series.description === null ||
                          series.description.length === 0
                            ? "No Description Available"
                            : series.description}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>Start Year</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        <h6>{series.startYear}</h6>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>End Year</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        <h6>{series.endYear}</h6>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>Creators</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        {series.creators.map((creator) => {
                          return <h6 key={creator.name}>{creator.name}</h6>;
                        })}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>Characters</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        {series.characters.map((creator) => {
                          return <h6 key={creator.name}>{creator.name}</h6>;
                        })}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={3}>
                      <div
                        className="description-title"
                        style={{ color: "#333333", fontFamily: "Roboto" }}
                      >
                        <h6>Comics</h6>
                      </div>
                    </Grid>
                    <Grid item lg={9}>
                      <div
                        className="description"
                        style={{ textAlign: "left" }}
                      >
                        {series.comics.map((comic) => {
                          return (
                            <p key={comic.name}>
                              <Link to={"/book/" + comic.resourceURI.slice(43)}>
                                {comic.name.length > 30
                                  ? comic.name.slice(0, 30) + "..."
                                  : comic.name}
                              </Link>
                            </p>
                          );
                        })}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
