import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

const MovieCredits = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movieCredits", { id: props.movieId }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;

  return (
    <>
      <Typography variant="h5" component="h3">
        Movie Credits
      </Typography>
      <Box sx={{display: "flex", overflowX: "auto", gap: 2}}>
        {cast.slice(0, 10).map((actor) => (
          <Card key={actor.id} sx={{flexShrink: 0, width: 150}}>
            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
              alt={actor.name}
            />
            <CardContent>
              <Typography variant="body2">{actor.name}</Typography>
              <Typography variant="body2">{actor.character}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MovieCredits;