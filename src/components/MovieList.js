


import MovieCard from "./MovieCard";
import MovieListShimmer from "./shimmer/MovieListShimmer";

const MovieList = ({ title, movies }) => {
 if (!movies) return <MovieListShimmer title={title} />; // ✅ shimmer
  if (movies.length === 0) return null;


  return (
    <div className="px-6">
      <h1 className="text-lg md:text-2xl py-4 text-white">{title}</h1>

      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
