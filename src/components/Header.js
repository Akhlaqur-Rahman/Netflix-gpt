


import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  return (
    <div className="relative z-30 w-screen px-8 py-2 bg-gradient-to-b from-black flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2 justify-between items-center gap-3">
          {/* ✅ MyList Link */}
          <Link
            to="/mylist"
            className="text-white font-semibold hover:underline"
          >
            My List
          </Link>

          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-2 bg-purple-800 text-white rounded-lg"
            onClick={() => dispatch(toggleGptSearchView())}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          <img
            className="hidden md:block w-10 h-10 rounded"
            src={user.photoURL}
            alt="user"
          />

          <button
            onClick={handleSignOut}
            className="font-bold text-white ml-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
