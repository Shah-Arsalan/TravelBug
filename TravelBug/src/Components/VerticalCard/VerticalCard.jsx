import axios from "axios";
import "./VerticalCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import { useData } from "../../Contexts/Datacontext";
const VerticalCard = ({ vid }) => {
  const { token } = useAuth();
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  const [appear, setAppear] = useState(false);
  const { title, category, img, creator, _id } = vid;
  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };

  const deleteLikeHandler = async () => {
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
  };
  console.log(appear);
  return (
    <>
      <div className="vertical-card-container">
        <div className="vertical-card">
          <div onClick={toSingleVideoPage} className="img-cont">
            <img
              src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
              className="vertical-image"
            />
          </div>
          <div onClick={toSingleVideoPage} className="details-section">
            <h2>{title}</h2>
            <p>{creator}</p>
          </div>
        </div>
        <div className="modal-container">
          {appear && (
            <div className="card-modal">
              <p onClick={deleteLikeHandler} className="modal-child">
                Remove from liked videos
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
