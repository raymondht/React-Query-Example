import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import PokeCardList from "./components/PokeCardList";
import "./styles.css";
import useAllPokemon from "./utils/react-query/query/pokemon/useAllPokemon";

const Home = () => {
  const {data: pokemonList, isLoading: isLoadingAllPokemon, error: errorLoadingAllPokemon} = useAllPokemon();
  console.log({pokemonList});
  const loaderView = isLoadingAllPokemon && <CircularProgress className="fixed-center" />;
  const errorView = errorLoadingAllPokemon && <Alert severity="error">{errorLoadingAllPokemon.errorMessage}</Alert>
  const pokemonListView = pokemonList && (
    <PokeCardList pokemonList={pokemonList} />
  );

  return (
    <>
      {errorView}
      {loaderView}
      {pokemonListView}
    </>
  );
};

export default Home;
