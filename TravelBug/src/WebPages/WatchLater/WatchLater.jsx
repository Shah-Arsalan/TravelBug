import { Sidebar, VerticalCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./WatchLater.css";

const WatchLater = () => {
  const { state } = useData();
  const { watchlater } = state;
  const watchlaterLen = watchlater.length;

  return (
    <>
      {watchlaterLen ? (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="liked-vid-container">
            {watchlater.map((ele) => {
              return (
                <VerticalCard key={ele._id} vid={ele} text={"watchlater"} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="liked-vid-container empty-page">
            No videos found . Explore and start adding videos to Watchlater
          </div>
        </div>
      )}
    </>
  );
};

export { WatchLater };
