
import { useNavigate, useParams } from "react-router-dom";
import "./SinglePlaylist.css";
import { Sidebar, VerticalCard } from "../../Components";
import { useEffect } from "react";
import { useSelector  , useDispatch} from "react-redux";
import { getCurrentPlaylistHandler } from "../../redux/videoSlice";

const SinglePlaylist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
const videos = useSelector(state => state.video)
const {playlist} = videos
  const { playlistid } = useParams();
  const activePlaylist =
    playlist?.find((element) => element._id === playlistid) || {};

    useEffect(() => {
dispatch(getCurrentPlaylistHandler({playlistid , token}))
    },[])

  return (
    <>
      <div className="product-listing-body">
        <div class="filter-and-category megaContainer">
          <Sidebar />
        </div>
        <div className="liked-vid-container">
          {activePlaylist.videos.map((ele) => {
            return (
              <VerticalCard
                key={ele._id}
                vid={ele}
                text={"singleplaylist"}
                pId={playlistid}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export { SinglePlaylist };
