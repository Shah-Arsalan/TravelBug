import "./VideoCard.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { useData } from "../../Contexts/Datacontext";
import { useState } from "react";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { addHistoryHandler, addLikeHandler, addWatchLaterHandler, deletePlaylistHandler } from "../../redux/videoSlice";

const VideoCard = ({ vid, playlistId }) => {
  const location = useLocation();
  const videoDispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const token = auth.token
  const videoData = useSelector(state => state.video)
  const {videos , playlist} = videoData
  const { state, dispatch, setModal, modal, activeVideo, setActiveVideo } =
    useData();

  const navigate = useNavigate();

  const { title, category, img, creator, _id } = vid;
  const video = videos?.find((element) => element._id === _id) || {};
  const [appear, setAppear] = useState(false);

  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };

  let currentPlaylist = "";
  if (playlistId) {
    currentPlaylist = playlist.filter((ele) => ele._id === playlistId);
  }

  const addToHistory = async () => {

    videoDispatch(addHistoryHandler({video , token}))
  };

  const watchLater = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
      } else {

        videoDispatch(addWatchLaterHandler({video , token}))
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const showModal = () => {
    if (!token) {
      navigate("/login", { state: { from: location } });
    } else {
      setAppear(false);
      setModal(true);
    }
  };

  const toSinglePlaylist = (pId) => {
    navigate(`/singleplaylist/${pId}`);
  };

  const deletePlaylist =  () => {

    videoDispatch(deletePlaylistHandler({playlistId,token}))
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
