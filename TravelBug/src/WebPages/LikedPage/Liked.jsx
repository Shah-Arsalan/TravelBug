import { useSelector  , useDispatch} from "react-redux";
import { Sidebar, VerticalCard, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Liked.css";
import { getLikesHandler } from "../../redux/videoSlice";
import { useDeferredValue, useEffect } from "react";

const Liked = () => {
  const dispatch = useDispatch()
  const {token}= useSelector(state => state.auth)
  const videos = useSelector(state => state.video)
  console.log(videos)
  const liked = videos?.liked
  console.log("liked videos are",liked)
  const likedLen = liked?.length;

  useEffect(() => {
    dispatch(getLikesHandler(token))
    },[])
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
