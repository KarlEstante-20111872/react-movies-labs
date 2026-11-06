import { getMovieRecommendations } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MovieRecommendations = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movieRecommendations", { id: props.movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <Typography variant="h5" component="h3">
        Recommended Movies
      </Typography>
      <Grid container>
        <MovieList movies={movies} action={(movie) => <AddToFavoritesIcon movie={movie} />} />
      </Grid>
    </>
  );
};

export default MovieRecommendations;
