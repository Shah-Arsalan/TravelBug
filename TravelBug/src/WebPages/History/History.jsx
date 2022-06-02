import { Sidebar, VerticalCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./History.css";
import { useEffect } from "react";

const History = () => {
  const { state } = useData();
  const { history } = state;
  const historyLen = history.length;

  return (
    <>
      {historyLen ? (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="liked-vid-container">
            {history.map((ele) => {
              return <VerticalCard key={ele._id} vid={ele} text={"history"} />;
            })}
          </div>
        </div>
      ) : (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="liked-vid-container empty-page">
            No items found . Explore and start watching videos ...{" "}
          </div>
        </div>
      )}
    </>
  );
};

export { History };
