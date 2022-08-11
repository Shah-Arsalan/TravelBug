import { Sidebar, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Playlist.css";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPlaylistHandler } from "../../redux/videoSlice";
const Playlist = () => {
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
  const videos = useSelector(state => state.video)
  console.log(videos, "inside playlist")
  const playlist = videos.playlist
  const playlistLen = playlist.length;

  useEffect(() => {
dispatch(getPlaylistHandler(token))
  },[])
  return (
    <>
      {playlistLen ? (
        <div className="product-listing-body">
          <div class="filter-and-category megaContainer">
            <Sidebar />
          </div>
          <div className="product-container">
            {playlist.map((ele) => {
              return <VideoCard key={ele._id} vid={ele} playlistId={ele._id} />;
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
            No playlists found . Explore videos and start making playlists.
          </div>
        </div>
      )}
    </>
  );
};

export { Playlist };
