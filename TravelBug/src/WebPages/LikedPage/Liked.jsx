import { VerticalCard, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Liked.css";

const Liked = () => {
  const { state } = useData();
  const { liked } = state;
  return (
    <>
      <div className="liked-page">
        {liked.map((ele) => {
          return <VerticalCard key={ele._id} vid={ele} />;
        })}
      </div>
    </>
  );
};

export { Liked };
