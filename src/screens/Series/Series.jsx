import React, { useEffect } from "react";
import { Container, Grid, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeries } from "../../actions/FetchActions/seriesFetchAction";
import "./styles.css";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
import { useHistory, useLocation } from "react-router-dom";
import { _MARVEL, _OUR_COLLECTION } from "../../utility/sources/sources";
import { _SERIES } from "../../utility/sources/itemTypes";
import {
  fetchSeriesAction,
  fetchSeriesErrorAction,
} from "../../actions/actionCreators/fetchDataActionCreators";

export default function Series(props) {
  const history = useHistory();
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
        } else {
          dispatch(fetchSeriesErrorAction());
        }
      }
    }
  }, [dispatch, props.id, newBooks, newBooksLoader, source]);
  //   When Data not loaded
  if (loader || newBooksLoader) return <Loader />;
  // When source not defined
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
              pathname: `/${_SERIES}/${props.id}`,
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
              pathname: `/${_SERIES}/${props.id}`,
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
  // if Series not found
  if (series.error) {
    return <p>{series.error}</p>;
  }

  return (
    <section id="series-body">
      <Container fixed style={{ marginTop: "1.5rem", marginBottom: "3rem " }}>
        <Grid container>
          <Grid item alignItems="center" xl={5} lg={5} md={5} sm={12} xs={12}>
            <Grid container direction="column">
              <Grid item className="series-image-box">
                <div>
                  <img
                    className="series-image"
                    src={series.image}
                    alt={series.title}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="series-description-box"
            item
            xl={7}
            lg={7}
            md={7}
            sm={12}
            xs={12}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <div className="series-title">
                  <h1>{series.title}</h1>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Description</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
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
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Start Year</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        <h6>{series.startYear}</h6>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>End Year</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        <h6>{series.endYear}</h6>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Divider style={{ width: "40%", margin: "0 auto" }} />
              <Grid item>
                <div style={{ display: "flex", margin: "1rem 0" }}>
                  <SaveItemsButton
                    id={series.id}
                    img={series.image}
                    title={series.title}
                    type="series"
                    source={source}
                  />
                </div>
              </Grid>
              <Divider style={{ width: "40%", margin: "0 auto" }} />
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Creators</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        {series.creators.length === 0 ? (
                          <p>No Creators Found</p>
                        ) : (
                          series.creators.map((creator) => {
                            return <h6 key={creator.name}>{creator.name}</h6>;
                          })
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Characters</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        {series.characters.length === 0 ? (
                          <p>No Characters Found</p>
                        ) : (
                          series.characters.map((creator) => {
                            return <h6 key={creator.name}>{creator.name}</h6>;
                          })
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Comics</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        {series.comics.length === 0 ? (
                          <p>No Comics found</p>
                        ) : (
                          series.comics.map((comic) => {
                            return (
                              <p key={comic.name}>
                                <Link
                                  to={{
                                    pathname:
                                      "/book/" + comic.resourceURI.slice(43),
                                    search: `?source=${_MARVEL}`,
                                  }}
                                >
                                  {comic.name.length > 30
                                    ? comic.name.slice(0, 30) + "..."
                                    : comic.name}
                                </Link>
                              </p>
                            );
                          })
                        )}
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
