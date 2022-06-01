import "./App.css";
import Mockman from "mockman-js";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  History,
  LandingPage,
  Liked,
  LoginPage,
  Playlist,
  Signup,
  SinglePlaylist,
  SingleVideo,
  WatchLater,
} from "./WebPages";
import { useAuth } from "./Contexts/Authcontext";
import { RequiresAuth } from "./RequiresAuth";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/singlevideo/:vidId" element={<SingleVideo />} />
        <Route
          path="/singleplaylist/:playlistid"
          element={<SinglePlaylist />}
        />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <Liked />
            </RequiresAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />

        <Route
          path="/watchlater"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />

        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
