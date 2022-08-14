import { Sidebar, VerticalCard } from "../../Components";
import { useSelector , useDispatch} from "react-redux";
import { useData } from "../../Contexts/Datacontext";
import "./WatchLater.css";
import { getWatchLaterHandler } from "../../redux/videoSlice";
import { useEffect } from "react";

const WatchLater = () => {
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
  const videos = useSelector(state => state.video)
  const watchlater = videos?.watchlater
  const watchlaterLen = watchlater?.length;

  useEffect(() => {
    dispatch(getWatchLaterHandler(token))
    },[])

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
