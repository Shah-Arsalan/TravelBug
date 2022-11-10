import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, VideoCard } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { addLikeHandler , addWatchLaterHandler, deleteLikeHandler, deleteWatchLaterHandler} from "../../redux/videoSlice";
import "./SingleVideo.css";

const SingleVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoData = useSelector(state => state.video)
  const {videos , liked , watchlater} = videoData
  const auth = useSelector(state => state.auth)
  const token = auth.token
  const { vidId } = useParams();
  const video = videos?.find((element) => element._id === vidId) || {};
  const otherVideoList = videos?.filter((element) => element._id != vidId);
  const dataDispatch = useDispatch()

  const isLiked = () => liked?.filter((vid) => vid._id === vidId).length > 0;
  const inWatchLater = () =>
    watchlater?.filter((vid) => vid._id === vidId).length > 0;

  const likeHandler = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      } else {
        if (isLiked()) {
          const _id = video?._id
          dataDispatch(deleteLikeHandler({token , _id}))
        } else {
dataDispatch(addLikeHandler({video , token}))
        }
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const watchLaterHandler = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      } else {
        if (inWatchLater()) {
          const _id = video?._id
          dataDispatch(deleteWatchLaterHandler({token , _id}))
        } else {
dataDispatch(addWatchLaterHandler({video , token}))
        }
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  return (
    <>
      <div className="outer-container">
        {" "}
        <div class="filter-and-category megaContainer sidebar">
          <Sidebar />
        </div>
        <div className="single-video-page">
          <div className="single-video-container">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${video?._id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div className="video-title">
              <h2>{video.title}</h2>
              <div className="vid-icons">
                <div
                  onClick={() => {
                    likeHandler();
                  }}
                  className={`icon-name ${isLiked() && "dark"}`}
                >
                  <i class="far fa-thumbs-up"></i>
                  Like
                </div>
                <div
                  onClick={() => {
                    watchLaterHandler();
                  }}
                  className={`icon-name ${inWatchLater() && "dark"}`}
                >
                  <i class="fas fa-clock"></i>
                  Watch Later
                </div>
              </div>
            </div>
          </div>
          <div className="other-video-container">
            {otherVideoList.map((ele) => {
              return <VideoCard key={ele._id} vid={ele} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { SingleVideo };
