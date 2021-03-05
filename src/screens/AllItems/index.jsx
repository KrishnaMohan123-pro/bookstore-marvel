import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allProductsFetch } from "../../actions/FetchActions/allProductsFetchActions";
import { _SERIES } from "../../utility/sources/itemTypes";
import { _MARVEL } from "../../utility/sources/sources";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Container, Grid, Button, CircularProgress } from "@material-ui/core";
import Loader from "../../components/Loader/loader";
import "./styles.css";
export default function AllItems() {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = location.search;
  const loader = useSelector((state) => state.loader.data);
  const searchParams = new URLSearchParams(search);
  const itemCategory = searchParams.get("itemCategory");
  const fetchedProducts = useSelector((state) => state.allProducts);
  const [offSet, setOffset] = useState(0);
  var allProducts = [];
  switch (itemCategory) {
    case "character":
      allProducts = fetchedProducts.characters;
      break;
    case "book":
      allProducts = fetchedProducts.comics;
      break;
    case "series":
      allProducts = fetchedProducts.series;
      break;
    default:
      console.log("DEFAULT");
  }

  useEffect(() => {
    dispatch(allProductsFetch(itemCategory, offSet));
  }, [dispatch, itemCategory, offSet]);
  if (loader && allProducts.length === 0) {
    return <Loader />;
  }
  return (
    <main>
      <p
        classsName="all-items-title"
        style={{
          fontFamily: "Dancing Script",
          fontSize: "4rem",
          backgroundImage: "linear-gradient(#c7ffd8, #f9f871, #c7ffd8)",
          padding: "2rem 0",
          margin: 0,
        }}
      >
        All{" "}
        {itemCategory === _SERIES
          ? itemCategory.toUpperCase()
          : itemCategory.toUpperCase() + "S"}
      </p>
      <section
        style={{
          backgroundImage: "linear-gradient( #e4fbff, #b8b5ff)",
          padding: "2rem 0",
        }}
      >
        <Container>
          <Grid container>
            {allProducts.map((product) => {
              return (
                <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={product.id}>
                  <ProductCard
                    type={itemCategory}
                    img={
                      product.thumbnail.path + "." + product.thumbnail.extension
                    }
                    title={product.title ? product.title : product.name}
                    price={product.prices && product.prices[0].price}
                    id={product.id}
                    startYear={product.startYear}
                    endYear={product.endYear}
                    source={_MARVEL}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </section>
      <section style={{ backgroundColor: "#b8b5ff", paddingBottom: "2rem" }}>
        {loader ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOffset((prevValue) => prevValue + 20);
            }}
          >
            Load More
          </Button>
        )}
      </section>
    </main>
  );
}
