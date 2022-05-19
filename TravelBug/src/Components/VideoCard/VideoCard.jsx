import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
const VideoCard = ({ vid }) => {
  const navigate = useNavigate();
  const { title, category, img, creator, _id } = vid;
  const toSingleVideoPage = () => {
    navigate(`/singlevideo/${_id}`);
  };
  return (
    <>
      <div className="video-card">
        <div onClick={toSingleVideoPage} className="image-container">
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
