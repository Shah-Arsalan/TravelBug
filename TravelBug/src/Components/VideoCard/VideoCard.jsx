import "./VideoCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";
import { useContext } from "react/cjs/react.production.min";
import { useData } from "../../Contexts/Datacontext";
import { useState } from "react";
const VideoCard = ({ vid }) => {
  const { token } = useAuth();
  const { state, dispatch } = useData();
  const { videos } = state;
  const navigate = useNavigate();

  const { title, category, img, creator, _id } = vid;
  const video = videos?.find((element) => element._id === _id) || {};
  const [appear, setAppear] = useState(false);
  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };

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
    console.log("video here ", video);
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

  return (
    <>
      <div className="video-card">
        <div
          onClick={() => {
            addToHistory();
            toSingleVideoPage();
          }}
          className="image-container"
        >
          <img src={`https://i.ytimg.com/vi/${_id}/0.jpg`} className="image" />
        </div>

        <div className="modal-title">
          <div className="title-box">
            <h3
              onClick={() => {
                addToHistory();
                toSingleVideoPage();
              }}
              className="vid-title"
            >
              {title}
            </h3>

            <i
              onClick={() => setAppear((prev) => !prev)}
              class="fas fa-ellipsis-v"
            ></i>
          </div>
          <div className="creator">
            <p>{creator}</p>
          </div>

          <div className="card-modal-main">
            {appear && (
              <div onClick={() => setAppear(false)}>
                <p className="main-modal-child border-1px">Add to playlist</p>
                <p onClick={watchLater} className="main-modal-child">
                  Add to watchlater
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { VideoCard };
