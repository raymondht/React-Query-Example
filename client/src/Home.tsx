import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import PokeCardList from "./components/PokeCardList";
import "./styles.css";
import useAllPokemon from "./utils/react-query/query/pokemon/useAllPokemon";

const Home = () => {
  const {data: pokemonList, isLoading: isLoadingAllPokemon, isError: isErrorLoadingAllPokemon} = useAllPokemon();

  const loaderView = isLoadingAllPokemon && <CircularProgress className="fixed-center" />;
  const pokemonListView = !isLoadingAllPokemon && !isErrorLoadingAllPokemon && (
    <PokeCardList pokemonList={pokemonList} />
  );
  return (
    <>
      {loaderView}
      {pokemonListView}
    </>
  );
};

export default Home;
