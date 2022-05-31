import axios from "axios";
import "./VerticalCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import { useData } from "../../Contexts/Datacontext";
const VerticalCard = ({ vid, text, pId }) => {
  const { token } = useAuth();
  const { state, dispatch, activeVideo } = useData();
  const { videos } = state;
  const navigate = useNavigate();
  const [appear, setAppear] = useState(false);
  const { title, category, img, creator, _id } = vid;
  const video = videos?.find((element) => element._id === _id) || {};
  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };

  let modalText = "";

  if (text === "liked") {
    modalText = "liked videos";
  } else if (text === "history") {
    modalText = "history";
  } else if (text === "watchlater") {
    modalText = "watchlater";
  } else if ((text = "singleplaylist")) {
    modalText = "playlist";
  }

  const deleteHandler = async (text) => {
    if (text === "liked") {
      try {
        const res = await axios.delete(`/api/user/likes/${_id}`, {
          headers: {
            authorization: token,
          },
        });

        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "LIKE",
            payload: { likes: res.data.likes },
          });
        }
      } catch (error) {
        console.log("The error is : ", error);
      }
    } else if (text === "history") {
      try {
        const res = await axios.delete(`/api/user/history/${_id}`, {
          headers: {
            authorization: token,
          },
        });

        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "HISTORY",
            payload: { history: res.data.history },
          });
        }
      } catch (error) {
        console.log("The error is : ", error);
      }
    } else if (text === "watchlater") {
      try {
        const res = await axios.delete(`/api/user/watchlater/${_id}`, {
          headers: {
            authorization: token,
          },
        });

        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "WATCHLATER",
            payload: { watchlater: res.data.watchlater },
          });
        }
      } catch (error) {
        console.log("The error is : ", error);
      }
    } else if (text === "singleplaylist") {
      try {
        console.log("suiiiiii");
        console.log("play id", pId);
        console.log("vid idddd", _id);
        const res = await axios.delete(`/api/user/playlists/${pId}/${_id}`, {
          headers: {
            authorization: token,
          },
        });

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

  return (
    <>
      <div className="vertical-card-container">
        <div className="vertical-card">
          <div
            onClick={() => {
              addToHistory();
              toSingleVideoPage();
            }}
            className="img-cont"
          >
            <img
              src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
              className="vertical-image"
            />
          </div>
          <div
            onClick={() => {
              addToHistory();
              toSingleVideoPage();
            }}
            className="details-section"
          >
            <h2>{title}</h2>
            <p>{creator}</p>
          </div>
        </div>
        <div className="modal-container">
          {appear && (
            <div className="card-modal">
              <p onClick={() => deleteHandler(text)} className="modal-child">
                Remove from {modalText}
              </p>
            </div>
          )}
          <i
            onClick={() => setAppear((prev) => !prev)}
            class="fas fa-ellipsis-v options"
          ></i>
        </div>
      </div>
    </>
  );
};

export { VerticalCard };
