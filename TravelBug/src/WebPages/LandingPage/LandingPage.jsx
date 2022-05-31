import { PlaylistModal, Sidebar, VideoList } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./LandingPage.css";

const LandingPage = () => {
  const { modal, setModal } = useData();
  return (
    <>
      <div className="product-listing-body">
        <div class="filter-and-category megaContainer">
          <Sidebar />
        </div>
        <div className="product-container">
          <VideoList />
        </div>
      </div>
      {modal && <PlaylistModal />}
    </>
  );
};
export { LandingPage };
