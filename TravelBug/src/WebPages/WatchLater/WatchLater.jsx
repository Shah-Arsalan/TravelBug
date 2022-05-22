import { Sidebar, VerticalCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./WatchLater.css";

const WatchLater = () => {
  const { state } = useData();
  const { watchlater } = state;

  return (
    <>
      <div className="product-listing-body">
        <div class="filter-and-category megaContainer">
          <Sidebar />
        </div>
        <div className="liked-vid-container">
          {watchlater.map((ele) => {
            return <VerticalCard key={ele._id} vid={ele} text={"watchlater"} />;
          })}
        </div>
      </div>
    </>
  );
};

export { WatchLater };
