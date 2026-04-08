



import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import MovieModal from "./MovieModal";
import useMyListSync from "../hooks/useMyListSync";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  useNowPlayingMovies();
  usePopularMovies();

  // ✅ load mylist on login
  useMyListSync(user);

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
          <MovieModal />
        </>
      )}
    </div>
  );
};

export default Browse;
