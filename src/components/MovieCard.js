


import { useDispatch } from "react-redux";
import { openMovieModal } from "../utils/moviesSlice";
import { IMG_CDN_URL } from "../utils/constants";


const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  if (!movie?.poster_path) return null;

  const handleClick = () => {
    dispatch(openMovieModal(movie));
  };

  return (
    <div className="w-36 md:w-48 pr-4 cursor-pointer" onClick={handleClick}>
      <img
        alt={movie?.title}
        src={  IMG_CDN_URL 
 + movie.poster_path}
        className="rounded-lg hover:scale-105 duration-300"
      />
    </div>
  );
};

export default MovieCard;
