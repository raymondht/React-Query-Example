import { Grid } from "@mui/material";
import * as React from "react";
import { PokemonListData } from "../utils/react-query/query/pokemon/useInfinitePokemon";
import PokeCard from "./PokeCard";

type PokeCardListProps = {
  pokemonList: PokemonListData[];
};
const PokeCardList = ({ pokemonList }: PokeCardListProps) => {
  return (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      {pokemonList.map((p: any) => {
        let urlItems = p.url.split("/");
        let pokemonId = urlItems[urlItems.length - 2];
        return (
          <Grid item key={pokemonId}>
            <PokeCard
              pokemonName={p.name}
              pokemonAvatar={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
              pokemonImg={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default PokeCardList;
