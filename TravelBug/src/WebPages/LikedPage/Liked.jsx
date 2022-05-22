import { Sidebar, VerticalCard, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Liked.css";

const Liked = () => {
  const { state } = useData();
  const { liked } = state;
  return (
    <>
      <div className="product-listing-body">
        <div class="filter-and-category megaContainer">
          <Sidebar />
        </div>
        <div className="liked-vid-container">
          {liked.map((ele) => {
            return <VerticalCard key={ele._id} vid={ele} text={"liked"} />;
          })}
        </div>
      </div>
    </>
  );
};

export { Liked };
