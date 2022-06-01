import { useData } from "../../Contexts/Datacontext";
import { useParams } from "react-router-dom";
import "./SinglePlaylist.css";
import { Sidebar, VerticalCard } from "../../Components";
const SinglePlaylist = () => {
  const { state } = useData();
  const { playlist } = state;
  const { playlistid } = useParams();
  const activePlaylist =
    playlist?.find((element) => element._id === playlistid) || {};
  console.log("inside single playlist page", playlistid);
  console.log("the active playlist is", activePlaylist);
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
