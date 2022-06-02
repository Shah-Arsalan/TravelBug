import { Sidebar, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Playlist.css";

const Playlist = () => {
  const { state } = useData();
  const { playlist } = state;
  const playlistLen = playlist.length;
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
