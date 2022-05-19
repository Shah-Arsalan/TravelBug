import { useParams } from "react-router-dom";
import { VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./SingleVideo.css";

const SingleVideo = () => {
  const { state } = useData();
  const { videos } = state;
  const { vidId } = useParams();
  const video = videos?.find((element) => element._id === vidId) || {};
  const otherVideoList = videos?.filter((element) => element._id != vidId);

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
              <div className="icon-name">
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
