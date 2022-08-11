import { useEffect } from "react";
import { PlaylistModal, Sidebar, VideoList } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import { useDispatch , useSelector } from "react-redux";
import "./LandingPage.css";
import { initialDataFetch } from "../../redux/videoSlice";

const LandingPage = () => {
  const { modal, setModal } = useData();
  const dispatch = useDispatch()
  useEffect(()=> {
dispatch(initialDataFetch())
  },[])
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
