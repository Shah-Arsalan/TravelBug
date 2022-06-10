import "./VideoCard.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";
import { useData } from "../../Contexts/Datacontext";
import { useState } from "react";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";

const VideoCard = ({ vid, playlistId }) => {
  const location = useLocation;
  const { token } = useAuth();
  const { state, dispatch, setModal, modal, activeVideo, setActiveVideo } =
    useData();

  const { videos } = state;
  const navigate = useNavigate();

  const { title, category, img, creator, _id } = vid;
  const video = videos?.find((element) => element._id === _id) || {};
  const [appear, setAppear] = useState(false);

  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };

  let currentPlaylist = "";
  if (playlistId) {
    currentPlaylist = state.playlist.filter((ele) => ele._id === playlistId);
  }

  const addToHistory = async () => {
    try {
      const res = await axios.post(
        "/api/user/history",
        { video },
        { headers: { authorization: token } }
      );

      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: "HISTORY",
          payload: { history: res.data.history },
        });
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const watchLater = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      } else {
        const res = await axios.post(
          "/api/user/watchlater",
          { video },
          { headers: { authorization: token } }
        );

        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "WATCHLATER",
            payload: { watchlater: res.data.watchlater },
          });
        }
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const showModal = () => {
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    } else {
      setAppear(false);
      setModal(true);
    }
  };

  const toSinglePlaylist = (pId) => {
    navigate(`/singleplaylist/${pId}`);
  };

  const deletePlaylist = async () => {
    console.log("pididid", playlistId);
    try {
      const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
      });
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
  return (
    <>
      <div className="video-card">
        <div
          onClick={() => {
            if (playlistId) {
              toSinglePlaylist(playlistId);
            } else {
              addToHistory();
              toSingleVideoPage();
            }
          }}
          className={`image-container ${playlistId ? "play-card" : ""} `}
        >
          <img
            src={
              playlistId
                ? `https://i.ytimg.com/vi/${currentPlaylist[0].videos[0]?._id}/0.jpg`
                : `https://i.ytimg.com/vi/${_id}/0.jpg`
            }
            className="image"
          />
          {playlistId && (
            <div className="video-number">
              {currentPlaylist[0].videos.length} videos
            </div>
          )}
        </div>

        <div className="modal-title">
          <div className="title-box">
            <h3
              onClick={() => {
                if (playlistId) {
                  toSinglePlaylist();
                } else {
                  addToHistory();
                  toSingleVideoPage();
                }
              }}
              className="vid-title"
            >
              {title}
            </h3>

            <i
              onClick={() => {
                setAppear((prev) => !prev);
                setActiveVideo(_id);
              }}
              class="fas fa-ellipsis-v"
            ></i>
          </div>
          <div className="creator">
            <p>{creator}</p>
          </div>

          {appear && (
            <div className="card-modal-main">
              {playlistId ? (
                <div onClick={() => setAppear(false)}>
                  <p
                    onClick={deletePlaylist}
                    className="main-modal-child border-1px"
                  >
                    Delete playlist
                  </p>
                </div>
              ) : (
                <div onClick={() => setAppear(false)}>
                  <p
                    onClick={showModal}
                    className="main-modal-child border-1px"
                  >
                    Add to playlist
                  </p>
                  <p onClick={watchLater} className="main-modal-child">
                    Add to watchlater
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { VideoCard };
