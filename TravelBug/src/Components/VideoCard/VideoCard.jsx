import "./VideoCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";
import { useContext } from "react/cjs/react.production.min";
import { useData } from "../../Contexts/Datacontext";
const VideoCard = ({ vid }) => {
  const { token } = useAuth();
  const { state, dispatch } = useData();
  const { videos } = state;
  const navigate = useNavigate();
  const { title, category, img, creator, _id } = vid;
  const video = videos?.find((element) => element._id === _id) || {};

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
        <div>
          <div className="title-box">
            <h3 onClick={toSingleVideoPage} className="vid-title">
              {title}
            </h3>
            <i class="fas fa-ellipsis-v"></i>
          </div>
          <div className="creator">{creator}</div>
        </div>
      </div>
    </>
  );
};

export { VideoCard };
