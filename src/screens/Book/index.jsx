import React, { useEffect } from "react";
import "./styles.css";
import Loader from "../../components/Loader/loader";
import CartButton from "../../components/CartButton/CartButton";
import { Container, Grid } from "@material-ui/core";
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
    <Container fixed style={{ marginTop: "1.5rem", marginBottom: "3rem " }}>
      <Grid container>
        <Grid item lg={3} style={{ alignItems: "center" }}>
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
                  src={comics.image}
                  alt={comics.title}
                />
              </div>
            </Grid>
            <Grid item>
              <div>
                <CartButton
                  id={comics.id}
                  img={comics.image}
                  price={comics.price}
                  title={comics.title}
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
            alignItems: "center",
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="book-title">
                <h2>{comics.title}</h2>
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
                      <h4>Price</h4>
                    </div>
                  </Grid>
                  <Grid item lg={9}>
                    <div className="description" style={{ textAlign: "left" }}>
                      <h4>{"$ " + comics.price}</h4>
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
                      <h6>Description</h6>
                    </div>
                  </Grid>
                  <Grid item lg={9}>
                    <div className="description" style={{ textAlign: "left" }}>
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
              <div className="book-description">
                <Grid container>
                  <Grid item lg={3}>
                    <div
                      className="description-title"
                      style={{ color: "#333333", fontFamily: "Roboto" }}
                    >
                      <h6>Published on</h6>
                    </div>
                  </Grid>
                  <Grid item lg={9}>
                    <div className="description" style={{ textAlign: "left" }}>
                      <h6>{comics.publishDate}</h6>
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
                    <div className="description" style={{ textAlign: "left" }}>
                      {comics.creators.map((creator) => {
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
                    <div className="description" style={{ textAlign: "left" }}>
                      {comics.characters.map((creator) => {
                        return <h6 key={creator.name}>{creator.name}</h6>;
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
  );
}
