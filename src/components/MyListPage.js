import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MyListPage = () => {
  const myListMovies = useSelector((store) => store?.myList?.movies || []);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">✅ My List</h1>

      {myListMovies.length === 0 ? (
        <p className="text-gray-400">No movies in your list yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {myListMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListPage;

