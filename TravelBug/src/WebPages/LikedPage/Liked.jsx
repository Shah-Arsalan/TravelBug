import { Sidebar, VerticalCard, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Liked.css";

const Liked = () => {
  const { state } = useData();
  const { liked } = state;
  const likedLen = liked.length;
  return (
    <>
      {likedLen ? (
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
      ) : (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="liked-vid-container empty-page">
            {" "}
            You haven't liked any videos yet...
          </div>
        </div>
      )}
    </>
  );
};

export { Liked };
