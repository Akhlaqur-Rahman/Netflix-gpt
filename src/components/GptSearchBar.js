


import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

import useVoiceSearch from "../hooks/useVoiceSearch";
import VoiceSearchButton from "./VoiceSearchButton";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [query, setQuery] = useState("");

  // ✅ Voice Search Hook
  const { isSupported, isListening, startListening } = useVoiceSearch({
    onResult: (transcript) => {
      setQuery(transcript);
      if (searchText.current) searchText.current.value = transcript;

      // ✅ Optional: auto search after voice input
      handleGptSearchClick(transcript);
    },
  });

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async (voiceQuery) => {
    const finalQuery = voiceQuery || query || searchText.current?.value;
    if (!finalQuery) return;

    // 🔥 tumhare existing GPT logic ke according yaha call hoga
    const tmdbResults = await searchMovieTMDB(finalQuery);

    dispatch(
      addGptMovieResult({
        movieNames: [finalQuery],
        movieResults: [tmdbResults],
      })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 gap-2 p-4 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 col-span-8 rounded-md"
          placeholder="Search movies..."
        />

        <button
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-2"
          onClick={() => handleGptSearchClick()}
        >
          Search
        </button>

        {/* ✅ Voice Button */}
        <div className="col-span-2 flex justify-end">
          <VoiceSearchButton
            isListening={isListening}
            onClick={startListening}
            disabled={!isSupported}
          />
        </div>
      </form>
    </div>
  );
};

export default GPTSearchBar;
