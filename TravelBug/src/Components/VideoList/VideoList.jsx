import { useData } from "../../Contexts/Datacontext";
import { VideoCard } from "../VideoCard/VideoCard";
import "./VideoList.css";

const VideoList = () => {
  const { state } = useData();
  const { videos } = state;

  return (
    <>
      {videos.map((ele) => {
        return <VideoCard key={ele._id} vid={ele} />;
      })}
    </>
  );
};

export { VideoList };
