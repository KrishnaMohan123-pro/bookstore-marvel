import React, { useEffect } from "react";
import "./styles.css";
import Loader from "../../components/Loader/loader";
import CartButton from "../../components/CartButton/CartButton";
import { Container, Grid } from "@material-ui/core";
import { fetchComics } from "../../actions/FetchActions/comicsFetch";
import { useDispatch, useSelector } from "react-redux";
export default function Book(props) {
  const dispatch = useDispatch();
  const newBooks = useSelector((state) => state.newBooks);
  console.log(newBooks);
  const comics = useSelector((state) => state.comics);
  const loader = useSelector((state) => state.loader.data);
  useEffect(() => {
    dispatch(fetchComics(props.id));
  }, [dispatch, props.id]);
  if (loader) {
    return <Loader />;
  }
  if (comics.error) {
    return <p>{comics.error}</p>;
  }

  return (
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
