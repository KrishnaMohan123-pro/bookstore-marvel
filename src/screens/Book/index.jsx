import React, { useEffect } from "react";
import "./styles.css";
import Loader from "../../components/Loader/loader";
import CartButton from "../../components/CartButton/CartButton";
import { Container, Grid, Divider } from "@material-ui/core";
import { fetchComics } from "../../actions/FetchActions/comicsFetch";
import {
  fetchComicsAction,
  fetchComicsErrorAction,
} from "../../actions/actionCreators/fetchDataActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { _MARVEL, _OUR_COLLECTION } from "../../utility/sources/sources";
import { _BOOK } from "../../utility/sources/itemTypes";
export default function Book(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // source of the collection
  const source = searchParams.get("source");
  const comics = useSelector((state) => state.comics);
  const newBooks = useSelector((state) => state.newBooks);
  const loader = useSelector((state) => state.loader.data);
  const newBooksLoader = useSelector((state) => state.loader.profile);
  useEffect(() => {
    if (source === _OUR_COLLECTION) {
      if (!newBooksLoader) {
        let pos = 0;
        let flag = false;
        for (let i = 0; i < newBooks.length; i += 1) {
          if (props.id === newBooks[i].id) {
            flag = true;
            pos = i;
            break;
          }
        }
        if (flag) {
          dispatch(
            fetchComicsAction({
              characters: [],
              creators: [],
              description: newBooks[pos].description,
              id: newBooks[pos].id,
              image:
                newBooks[pos].image.length === 0
                  ? "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                  : newBooks[pos].image,
              price: newBooks[pos].price,
              publishDate: newBooks[pos].publishedOn,
              title: newBooks[pos].title,
            })
          );
        } else {
          dispatch(fetchComicsErrorAction());
        }
      }
    } else dispatch(fetchComics(props.id));
  }, [dispatch, props.id, newBooks, newBooksLoader, source]);
  if (loader || newBooksLoader) {
    return <Loader />;
  }

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
              pathname: `/${_BOOK}/${props.id}`,
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
              pathname: `/${_BOOK}/${props.id}`,
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

  if (comics.error) {
    return <p>{comics.error}</p>;
  }

  return (
    <section id="book-body">
      <Container fixed>
        <Grid container>
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={12}
            xs={12}
            style={{ alignItems: "center" }}
          >
            <Grid container direction="column">
              <Grid className="book-image-box" item>
                <div>
                  <img
                    className="book-img"
                    src={comics.image}
                    alt={comics.title}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="book-description-box"
            item
            lg={7}
            md={7}
            sm={12}
            xs={12}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <div className="book-title">
                  <h1>{comics.title}</h1>
                </div>
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h3>Price</h3>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        <h4>{"$ " + comics.price}</h4>
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
                        <h5>Description</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        <p>
                          {comics.description === null ||
                          comics.description.length === 0
                            ? "No Description Available"
                            : comics.description}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <Divider style={{ width: "40%", margin: "0 auto" }} />
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <CartButton
                    id={comics.id}
                    img={comics.image}
                    price={comics.price}
                    title={comics.title}
                    source={source}
                  />
                </div>
                <Divider style={{ width: "40%", margin: "0 auto" }} />
              </Grid>
              <Grid item>
                <div className="book-description">
                  <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <div className="description-title">
                        <h5>Published on</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        <h6>{comics.publishDate}</h6>
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
                        <h5>Creators</h5>
                      </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                      <div className="description">
                        {comics.creators.length === 0 ? (
                          <p>No Creators Found</p>
                        ) : (
                          comics.creators.map((creator) => {
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
                        {comics.characters.length === 0 ? (
                          <p>No Characters Found</p>
                        ) : (
                          comics.characters.map((creator) => {
                            return <h6 key={creator.name}>{creator.name}</h6>;
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
