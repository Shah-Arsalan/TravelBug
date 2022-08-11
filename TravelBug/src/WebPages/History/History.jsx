import { Sidebar, VerticalCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./History.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryHandler } from "../../redux/videoSlice";

const History = () => {
  const dispatch = useDispatch()
  const {token}= useSelector(state => state.auth)
  const videos = useSelector(state => state.video)
  const history = videos?.history
  const historyLen = history?.length;

useEffect(() => {
dispatch(getHistoryHandler(token))
},[])

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
