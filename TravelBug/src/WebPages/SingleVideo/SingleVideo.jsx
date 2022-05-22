import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { VideoCard } from "../../Components";
import { useAuth } from "../../Contexts/Authcontext";
import { useData } from "../../Contexts/Datacontext";
import "./SingleVideo.css";

const SingleVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useData();
  const { token } = useAuth();
  const { liked, videos } = state;
  const { vidId } = useParams();
  const video = videos?.find((element) => element._id === vidId) || {};
  const otherVideoList = videos?.filter((element) => element._id != vidId);

  const isLiked = () => liked.filter((vid) => vid._id === vidId).length > 0;

  const likeHandler = async () => {
    console.log("video here ", video);
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      } else {
        if (isLiked()) {
          const res = await axios.delete(`/api/user/likes/${video?._id}`, {
            headers: {
              authorization: token,
            },
          });
          console.log("del response ", res);
          if (res.status === 200 || res.status === 201) {
            dispatch({
              type: "LIKE",
              payload: { likes: res.data.likes },
            });
          }
        } else {
          const res = await axios.post(
            "/api/user/likes",
            { video },
            { headers: { authorization: token } }
          );

          if (res.status === 200 || res.status === 201) {
            dispatch({
              type: "LIKE",
              payload: { likes: res.data.likes },
            });
          }
        }
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  return (
    <>
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
              <div className="icon-name">
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
    </>
  );
};

export { SingleVideo };
