import { useSelector } from "react-redux";
import { useData } from "../../Contexts/Datacontext";
import { VideoCard } from "../VideoCard/VideoCard";
import "./VideoList.css";

const VideoList = () => {
  const video = useSelector(state => state.video)
  const videos = video.videos


  return (
    <>
      {videos.map((ele) => {
        return <VideoCard key={ele._id} vid={ele} />;
      })}
    </>
  );
};

export { VideoList };
