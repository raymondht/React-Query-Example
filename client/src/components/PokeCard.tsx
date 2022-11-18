import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import "../styles.css";

type PokeCardProps = {
  pokemonName: string;
  pokemonAvatar: string;
  pokemonImg: string;
};

const PokeCard = (props: PokeCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={props.pokemonAvatar} aria-label="Pokemon Avatar" />
        }
        title={props.pokemonName}
      />
      <CardMedia
        component="img"
        height="300"
        image={props.pokemonImg}
        alt="Pokemon Image"
      />

      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PokeCard;
