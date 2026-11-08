import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const PopularMoviesPage = (props) => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular", { page }],
    queryFn: getPopularMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default PopularMoviesPage;
