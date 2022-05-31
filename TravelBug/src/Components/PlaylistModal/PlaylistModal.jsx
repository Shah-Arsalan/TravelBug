import "./PlaylistModal.css";
import axios from "axios";
import { useState } from "react";
import { useData } from "../../Contexts/Datacontext";
import { useAuth } from "../../Contexts/Authcontext";
const PlaylistModal = () => {
  const { state, dispatch } = useData();
  const { token } = useAuth();
  const { modal, setModal, activeVideo, setActiveVideo } = useData();
  const [playlistTitle, setTitle] = useState("");
  const { videos } = state;
  const video = videos?.find((element) => element._id === activeVideo) || {};

  const createPlaylist = async () => {
    try {
      const res = await axios.post(
        "/api/user/playlists",
        { playlist: { title: playlistTitle, description: "bar bar bar" } },
        { headers: { authorization: token } }
      );
      console.log("playlist array", res);
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: "PLAYLIST",
          payload: { playlists: res.data.playlists },
        });
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const playlistHandler = async (e, elem) => {
    const currentPlaylist = state.playlist.filter((ele) => ele != elem);

    if (e.target.checked) {
      console.log("checked");

      try {
        const res = await axios.post(
          `/api/user/playlists/${elem._id}`,
          { video },
          { headers: { authorization: token } }
        );
        console.log("add response", res.data.playlist);
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "PLAYLIST",
            payload: { playlist: res.data.playlist },
          });
        }
      } catch (error) {
        console.log("The error is : ", error);
      }
    } else {
      console.log("un-checked");
      try {
        const res = await axios.delete(
          `/api/user/playlists/${elem._id}/${activeVideo}`,
          { headers: { authorization: token } }
        );
        console.log("del response", res.data.playlist);
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "PLAYLIST",
            payload: { playlist: res.data.playlist },
          });
        }
      } catch (error) {
        console.log("The error is : ", error);
      }
    }
  };

  return (
    <>
      <div className="plist-m-container">
        <div className="plist-m">
          <div className="heading-container">
            <p className="heading-txt">Add to playlist</p>
            <i onClick={() => setModal(false)} class="fas fa-times"></i>
          </div>

          <div className="playlists">
            {state.playlist?.map((elem) => {
              const inPlaylist = elem.videos?.some(
                (elem) => elem._id === activeVideo
              );
              return (
                <>
                  <div className="playlist-child">
                    <input
                      checked={inPlaylist}
                      onChange={(e) => playlistHandler(e, elem)}
                      type="checkbox"
                      id={elem.title}
                    />
                    <label htmlFor={elem.title}>{elem.title}</label>
                  </div>
                </>
              );
            })}
          </div>
          <div className="input-container">
            <p>Name:</p>
            <input
              value={playlistTitle}
              onChange={(e) => setTitle(e.target.value)}
              name="playlistName"
              type="text"
            />
            <button
              className="primary-button"
              onClick={() => {
                setTitle("");
                createPlaylist();
              }}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export { PlaylistModal };
