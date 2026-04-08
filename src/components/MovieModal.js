




import { useDispatch, useSelector } from "react-redux";
import { closeMovieModal } from "../utils/moviesSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";


import {
  addMovieToMyList,
  fetchMyList,
  removeMovieFromMyList,
} from "../utils/myListFirestore";
import { setMyListMovies } from "../utils/myListSlice";

const MovieModal = () => {
  const dispatch = useDispatch();

  const { selectedMovie, showMovieModal, trailerVideo } = useSelector(
    (store) => store.movies
  );

  // ✅ user + mylist
  const user = useSelector((store) => store.user);
  const myListMovies = useSelector((store) => store?.myList?.movies || []);

  // ✅ trailer fetch on open
  useMovieTrailer(selectedMovie?.id);

  if (!showMovieModal || !selectedMovie) return null;

  const handleClose = () => dispatch(closeMovieModal());

  const isAdded = myListMovies.some(
    (m) => String(m.id) === String(selectedMovie.id)
  );

  const handleToggleMyList = async () => {
    if (!user?.uid) {
      alert("Please login to use My List");
      return;
    }

    if (isAdded) {
      await removeMovieFromMyList(user.uid, selectedMovie.id);
    } else {
      await addMovieToMyList(user.uid, selectedMovie);
    }

    // ✅ refresh redux
    const latestMovies = await fetchMyList(user.uid);
    dispatch(setMyListMovies(latestMovies));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center px-4">
      <div className="bg-zinc-900 w-full max-w-4xl rounded-lg overflow-hidden relative">
        {/* ❌ Close */}
        <button
          className="absolute top-3 right-3 text-white text-xl bg-black/60 px-3 py-1 rounded"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* ✅ Trailer */}
        <div className="w-full aspect-video bg-black">
          {trailerVideo?.key ? (
            <iframe
              className="w-full h-full"
              src={
                "https://www.youtube.com/embed/" +
                trailerVideo.key +
                "?autoplay=1&mute=1"
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ) : (
            <div className="text-white p-6">Loading Trailer...</div>
          )}
        </div>

        {/* ✅ Details */}
        <div className="p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            {selectedMovie?.title}
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            ⭐ {selectedMovie?.vote_average?.toFixed(1)} | Release:{" "}
            {selectedMovie?.release_date}
          </p>

          <p className="mt-4 text-gray-200">{selectedMovie?.overview}</p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="bg-white text-black px-6 py-2 rounded font-semibold">
              ▶ Play
            </button>

            {/* ✅ My List Button */}
            <button
              onClick={handleToggleMyList}
              className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600"
            >
              {isAdded ? "✓ Added (Remove)" : "+ My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
