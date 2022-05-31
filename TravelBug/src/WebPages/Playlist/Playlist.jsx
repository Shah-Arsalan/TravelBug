import { Sidebar, VideoCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./Playlist.css";

const Playlist = () => {
  const { state } = useData();
  const { playlist } = state;
  return (
    <>
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
    </>
  );
};

export { Playlist };
