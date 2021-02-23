import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allProductsFetch } from "../../actions/FetchActions/allProductsFetchActions";
import { _SERIES } from "../../utility/sources/itemTypes";
import { _MARVEL } from "../../utility/sources/sources";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Container, Grid, Button, CircularProgress } from "@material-ui/core";
import Loader from "../../components/Loader/loader";
export default function AllItems() {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = location.search;
  const loader = useSelector((state) => state.loader.data);
  const searchParams = new URLSearchParams(search);
  const itemCategory = searchParams.get("itemCategory");
  const allProducts = useSelector((state) => state.allProducts);
  const [offSet, setOffset] = useState(0);

  useEffect(() => {
    dispatch(allProductsFetch(itemCategory, offSet));
  }, [dispatch, itemCategory, offSet]);
  if (loader && allProducts.length === 0) {
    return <Loader />;
  }
  return (
    <main>
      <p>
        All{" "}
        {itemCategory === _SERIES
          ? itemCategory.toUpperCase()
          : itemCategory.toUpperCase() + "S"}
      </p>
      <section>
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
      <section>
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
