import "./VideoCard.css";

const VideoCard = ({ vid }) => {
  const { title, category, img, creator, _id } = vid;
  return (
    <>
      <div className="video-card">
        <div className="image-container">
          <img src={`https://i.ytimg.com/vi/${_id}/0.jpg`} className="image" />
        </div>
        <div>
          <div className="title-box">
            <h3 className="vid-title">{title}</h3>
            <i class="fas fa-ellipsis-v"></i>
          </div>
          <div className="creator">{creator}</div>
        </div>
      </div>
    </>
  );
};

export { VideoCard };
