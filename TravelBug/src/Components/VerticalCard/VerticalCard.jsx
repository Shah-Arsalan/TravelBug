import axios from "axios";
import "./VerticalCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeHandler , deleteHistoryHandler, addHistoryHandler, deleteWatchLaterHandler, removeFromPlaylistHandler} from "../../redux/videoSlice";
const VerticalCard = ({ vid, text, pId }) => {
  const auth = useSelector(state => state.auth)
  const videoData = useSelector(state => state.video)
  const token = auth.token
  const vidDispatch = useDispatch()
  const { videos } = videoData;
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
      vidDispatch(deleteLikeHandler({token , _id}))
    } else if (text === "history") {
      vidDispatch(deleteHistoryHandler({token , _id}))
    } else if (text === "watchlater") {

      vidDispatch(deleteWatchLaterHandler({token , _id}))

    } else if (text === "singleplaylist") {

      vidDispatch(removeFromPlaylistHandler({pId , _id , token}))
    }
  };

  const addToHistory = () => {

    vidDispatch(addHistoryHandler({video,token}))
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
