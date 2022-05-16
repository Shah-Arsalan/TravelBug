import { Sidebar, VideoList } from "../../Components";
import "./LandingPage.css";

const LandingPage = () => {
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
    </>
  );
};
export { LandingPage };
